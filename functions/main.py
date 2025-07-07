import os
from llama_index.core import SimpleDirectoryReader, VectorStoreIndex, StorageContext, Settings
from llama_index.vector_stores.pinecone import PineconeVectorStore
from pinecone import Pinecone, ServerlessSpec
from firebase_functions import https_fn
from firebase_admin import credentials, initialize_app, firestore, auth
from llama_index.readers.web import SimpleWebPageReader

# --- GLOBAL INITIALIZATIONS ---
# (Keep this part as it was after the service account key fix)
try:
    SERVICE_ACCOUNT_KEY_PATH = os.path.join(os.path.dirname(__file__), 'resume-app-3c130-firebase-adminsdk-fbsvc-d1bdabe99f.json')
    cred = credentials.Certificate(SERVICE_ACCOUNT_KEY_PATH)
    initialize_app(cred)
except ValueError:
    pass
except Exception as e:
    print(f"Error initializing Firebase Admin SDK with service account: {e}")
    raise

db = firestore.client()

Settings.api_key = os.getenv("OPENAI_API_KEY")

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_ENVIRONMENT = os.getenv("PINECONE_ENVIRONMENT")
PINECONE_INDEX_NAME = "blog-content-index"

pc = Pinecone(
    api_key=PINECONE_API_KEY,
    environment=PINECONE_ENVIRONMENT
)

def setup_pinecone_index():
    if PINECONE_INDEX_NAME not in pc.list_indexes().names():
        pc.create_index(
            name=PINECONE_INDEX_NAME,
            dimension=1536,
            metric="cosine",
            spec=ServerlessSpec(cloud="aws", region="us-east-1")
        )
    return pc.Index(PINECONE_INDEX_NAME)

def ingest_blog_content_core(content_url: str, post_id: str):
    documents = SimpleWebPageReader(urls=[content_url]).load_data()
    pinecone_index = setup_pinecone_index()
    vector_store = PineconeVectorStore(pinecone_index=pinecone_index)
    storage_context = StorageContext.from_defaults(vector_store=vector_store)
    index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
    doc_ref = db.collection('blogContentMetadata').document(post_id)
    doc_ref.set({
        'url': content_url,
        'indexed_at': firestore.SERVER_TIMESTAMP,
        'status': 'indexed'
    })
    return f"Content from {content_url} indexed successfully."


# --- HELPER FOR TOKEN VERIFICATION ---
def verify_firebase_token(req: https_fn.Request):
    auth_header = req.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        raise https_fn.HttpsError(
            https_fn.FunctionsErrorCode.UNAUTHENTICATED,
            "Authentication required: No ID token provided."
        )

    id_token = auth_header.split('Bearer ')[1]
    try:
        # Verify the ID token. This also fetches user info like UID, email, custom claims.
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token
    except Exception as e:
        # Catch various auth errors (invalid token, expired token, etc.)
        raise https_fn.HttpsError(
            https_fn.FunctionsErrorCode.UNAUTHENTICATED,
            f"Invalid authentication token: {e}"
        )


# --- FIREBASE CLOUD FUNCTIONS ---

@https_fn.on_request()
def ask_blog(req: https_fn.Request) -> https_fn.Response:
    try:
        # Verify token first
        decoded_token = verify_firebase_token(req)
        # Optional: You can now access user ID, email, or custom claims from decoded_token
        # print(f"ask_blog invoked by user: {decoded_token['uid']} ({decoded_token['email']})")

        data = req.get_json(silent=True)
        user_query = data.get("query")

        if not user_query:
            return https_fn.Response("Please provide a 'query' in the request body.", status=400)

        current_pinecone_index = pc.Index(PINECONE_INDEX_NAME)
        vector_store = PineconeVectorStore(pinecone_index=current_pinecone_index)
        index = VectorStoreIndex.from_vector_store(vector_store=vector_store)
        query_engine = index.as_query_engine()
        response = query_engine.query(user_query)

        return https_fn.Response({"answer": str(response)}, status=200)

    except https_fn.HttpsError as e:
        return https_fn.Response(e.message, status=e.code.value) # Use HttpsError for client-friendly codes
    except Exception as e:
        print(f"Error in ask_blog function: {e}")
        return https_fn.Response("An internal server error occurred.", status=500)


@https_fn.on_request()
def trigger_ingestion(req: https_fn.Request) -> https_fn.Response:
    try:
        # Verify token first
        decoded_token = verify_firebase_token(req)

        # For ingestion, you might want to check for an 'admin' custom claim
        if not decoded_token.get('admin', False):
            raise https_fn.HttpsError(
                https_fn.FunctionsErrorCode.PERMISSION_DENIED,
                "Permission denied: Not authorized to trigger ingestion."
            )
        # print(f"Ingestion triggered by admin user: {decoded_token['uid']} ({decoded_token['email']})")

        data = req.get_json(silent=True)
        content_url = data.get('contentUrl')
        post_id = data.get('postId')

        if not content_url or not post_id:
            return https_fn.Response("Missing 'contentUrl' or 'postId' in request body.", status=400)

        result = ingest_blog_content_core(content_url, post_id)
        return https_fn.Response(result, status=200)

    except https_fn.HttpsError as e:
        return https_fn.Response(e.message, status=e.code.value)
    except Exception as e:
        print(f"Error during ingestion: {e}")
        return https_fn.Response(f"An error occurred during ingestion: {e}", status=500)