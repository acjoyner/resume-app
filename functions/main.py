import os
import json
import re
import traceback 

from firebase_admin import credentials, initialize_app, firestore, auth
from firebase_functions import https_fn

from llama_index.core import VectorStoreIndex, StorageContext, Settings
from llama_index.core.schema import Document
from llama_index.vector_stores.pinecone import PineconeVectorStore
from pinecone import Pinecone, ServerlessSpec

# ==============================================================================
# --- GLOBAL INITIALIZATIONS & CONFIGURATION ---
# ==============================================================================
try:
    print("Initializing Firebase Admin SDK...")
    initialize_app()
    print("Firebase Admin SDK initialized.")
except ValueError:
    print("Default init failed. Trying local service account...")
    try:
        SERVICE_ACCOUNT_KEY_PATH = os.path.join(os.path.dirname(__file__), 'resume-app-3c130-firebase-adminsdk-fbsvc-d1bdabe99f.json')
        cred = credentials.Certificate(SERVICE_ACCOUNT_KEY_PATH)
        initialize_app(cred)
        print("Initialized with local service account.")
    except Exception as e:
        print(f"FATAL: Could not initialize with local key. Error: {e}")
        raise

# Constants
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_INDEX_NAME = "blog-content-index"

# ==============================================================================
# --- ON-DEMAND SERVICE SETUP ---
# ==============================================================================
def setup_pinecone_index():
    # --- FINAL DEBUGGING STEP: Explicitly check for the API key ---
    pinecone_key = os.getenv("PINECONE_API_KEY")
    if not pinecone_key:
        print("!!! FATAL ERROR: PINECONE_API_KEY environment variable not found or is empty.")
        raise ValueError("PINECONE_API_KEY not set.")
    
    print(f"Pinecone API Key found. Connecting to Pinecone...")
    # --- End of debugging check ---
    
    pc = Pinecone(api_key=pinecone_key)
    if PINECONE_INDEX_NAME not in pc.list_indexes().names():
        pc.create_index(
            name=PINECONE_INDEX_NAME, dimension=1536, metric="cosine",
            spec=ServerlessSpec(cloud="aws", region="us-east-1")
        )
    return pc.Index(PINECONE_INDEX_NAME)

# ==============================================================================
# --- HELPER FUNCTIONS ---
# ==============================================================================
def verify_firebase_token(req: https_fn.Request):
    auth_header = req.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        raise https_fn.HttpsError(https_fn.FunctionsErrorCode.UNAUTHENTICATED, "Unauthorized: No token.")
    id_token = auth_header.split('Bearer ')[1]
    try:
        return auth.verify_id_token(id_token)
    except Exception as e:
        raise https_fn.HttpsError(https_fn.FunctionsErrorCode.UNAUTHENTICATED, f"Unauthorized: Invalid token. {e}")

# ==============================================================================
# --- FIREBASE CLOUD FUNCTIONS ---
# ==============================================================================

@https_fn.on_request()
def set_admin_claim(req: https_fn.Request) -> https_fn.Response:
    cors_headers = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
    if req.method == 'OPTIONS': return https_fn.Response("", status=204, headers=cors_headers)
    try:
        verify_firebase_token(req)
        data = req.get_json(silent=True) or {}
        email = data.get('email')
        if not email: raise https_fn.HttpsError(https_fn.FunctionsErrorCode.INVALID_ARGUMENT, "Request must include 'email'.")
        
        user = auth.get_user_by_email(email)
        auth.set_custom_user_claims(user.uid, {'admin': True})
        return https_fn.Response(json.dumps({"message": f"Successfully set admin claim for {email}"}), status=200, headers=cors_headers)
    except Exception as e:
        print(f"Error in set_admin_claim: {e}")
        return https_fn.Response(json.dumps({"error": str(e)}), status=500, headers=cors_headers)


@https_fn.on_request()
def trigger_ingestion(req: https_fn.Request) -> https_fn.Response:
    cors_headers = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
    if req.method == 'OPTIONS': return https_fn.Response("", status=204, headers=cors_headers)
    try:
        decoded_token = verify_firebase_token(req)
        if not decoded_token.get('admin', False):
            raise https_fn.HttpsError(https_fn.FunctionsErrorCode.PERMISSION_DENIED, "Permission denied.")
        
        data = req.get_json(silent=True) or {}
        resume_id = data.get('resumeId')
        resume_sections = data.get('resumeSections')
        if not resume_id or not isinstance(resume_sections, list) or not resume_sections:
            raise https_fn.HttpsError(https_fn.FunctionsErrorCode.INVALID_ARGUMENT, "Request must include 'resumeId' and a non-empty list of 'resumeSections'.")

        Settings.api_key = os.getenv("OPENAI_API_KEY")
        pinecone_index = setup_pinecone_index()
        vector_store = PineconeVectorStore(pinecone_index=pinecone_index)
        documents_to_add, all_results = [], []

        for i, section in enumerate(resume_sections):
            content_title = section.get("title", f"Section {i}")
            content_text = section.get("content", "")
            if not content_text: continue

            unique_post_id = f"{resume_id}-{content_title.lower().replace(' ', '-')}-{i}"
            print(f"Preparing section: {content_title}")
            documents_to_add.append(
                Document(text=content_text, doc_id=unique_post_id, metadata={"resume_id": resume_id, "section": content_title})
            )
            all_results.append({"section": content_title, "status": "prepared"})

        if not documents_to_add: raise ValueError("No processable content found.")

        storage_context = StorageContext.from_defaults(vector_store=vector_store)
        VectorStoreIndex.from_documents(
            documents_to_add,
            storage_context=storage_context,
            show_progress=True
        )
        
        print(f"Successfully ingested {len(documents_to_add)} sections.")
        return https_fn.Response(json.dumps({"message": "Ingestion completed successfully.", "results": all_results}), status=200, headers=cors_headers)

    except Exception as e:
        print(f"!!! CAUGHT AN EXCEPTION IN trigger_ingestion !!!")
        print(traceback.format_exc())
        return https_fn.Response(json.dumps({"error": "An internal server error occurred."}), status=500, headers=cors_headers)


@https_fn.on_request()
def ask_blog(req: https_fn.Request) -> https_fn.Response:
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Content-Type": "application/json"
    }
    
    if req.method == 'OPTIONS': return https_fn.Response("", status=204, headers=cors_headers)

    try:
        Settings.api_key = os.getenv("OPENAI_API_KEY")
        verify_firebase_token(req)
        data = req.get_json(silent=True) or {}
        user_query = data.get("query")
        if not user_query: raise https_fn.HttpsError(https_fn.FunctionsErrorCode.INVALID_ARGUMENT, "Please provide a 'query'.")

        pinecone_index = setup_pinecone_index()
        vector_store = PineconeVectorStore(pinecone_index=pinecone_index)
        index = VectorStoreIndex.from_vector_store(vector_store=vector_store)
        query_engine = index.as_query_engine()
        
        response = query_engine.query(user_query)
        answer = str(response).strip() if response.source_nodes else "I'm sorry, I could not find relevant information in the resume to answer that question."
        return https_fn.Response(json.dumps({"answer": answer}), status=200, headers=cors_headers)
    except Exception as e:
        status_code = getattr(e, 'code', 500) if isinstance(e, https_fn.HttpsError) else 500
        error_message = str(getattr(e, 'message', "An internal server error occurred."))
        print(f"Error in ask_blog: {error_message}")
        return https_fn.Response(json.dumps({"error": error_message}), status=status_code, headers=cors_headers)