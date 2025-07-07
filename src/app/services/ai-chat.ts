// src/app/services/ai-chat.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Make sure this path is correct
import { AuthS } from './authS';

@Injectable({
  providedIn: 'root',
})
export class AiChat {
  // Replace with your actual deployed function URL
  // You can get this from Firebase Console > Functions > ask_blog > Trigger
  private askBlogFunctionUrl =
    'https://us-central1-resume-app-3c130.cloudfunctions.net/ask_blog'; // YOUR_ACTUAL_FUNCTION_URL_HERE
  private ingestFunctionUrl =
    'https://us-central1-resume-app-3c130.cloudfunctions.net/trigger_ingestion'; // YOUR_ACTUAL_FUNCTION_URL_HERE

  // --- CORRECTED BASE URL ---
  private functionsBaseUrl = 'us-central1-resume-app-3c130.cloudfunctions.net';
  // --- End CORRECTED BASE URL ---
  // Example: 'us-central1-my-blog-project.cloudfunctions.net'

  constructor(private http: HttpClient, private authService: AuthS) {
    // You can also get the base URL from the Firebase SDK if you prefer:
    // const functions = getFunctions();
    // this.functionsBaseUrl = `https://${functions.region}-${functions.app.name}.cloudfunctions.net`;
  }

  async askBlog(query: string): Promise<Observable<{ answer: string }>> {
    const idToken = await this.authService.getIdToken();

    // --- ADD THIS CONSOLE.LOG TEMPORARILY ---
    console.log('--- Firebase ID Token (for curl test) ---');
    console.log(idToken);
    console.log('-------------------------------------------');
    // --- END TEMPORARY CONSOLE.LOG ---

    if (!idToken) {
      // Handle case where user is not logged in
      throw new Error(
        'Authentication required: Please log in to ask questions.'
      );
    }

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`, // Attach the ID token
    });
    const body = { query: query };

    return this.http.post<{ answer: string }>(this.askBlogFunctionUrl, body, {headers,});
  }

  async triggerContentIngestion(contentUrl: string, postId: string): Promise<Observable<any>> {
    const idToken = await this.authService.getIdToken();

    if (!idToken) {
      throw new Error('Authentication required: Please log in to trigger ingestion.');
    }

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}` // Attach the ID token
    });
    const body = { contentUrl: contentUrl, postId: postId };

    return this.http.post(this.ingestFunctionUrl, body, { headers });
  }
  

}