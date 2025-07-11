// src/app/app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // Your routing file

// --- ENSURE THESE IMPORTS ARE CORRECT ---
import { provideFirebaseApp, initializeApp } from '@angular/fire/app'; // <--- THIS LINE IS CRUCIAL
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getAuth, provideAuth } from '@angular/fire/auth'; // If using Auth
// If you are using Firestore, add:
// import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { environment } from '../environments/environment.prod'; // Your environment file
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(), // <--- Add this line!
    // --- FIREBASE INITIALIZATION ---
    provideFirebaseApp(() => initializeApp(environment.firebase)), // <--- This line is throwing the error
    provideFunctions(() => getFunctions()),
    provideAuth(() => getAuth()),
    // If you are using Firestore, uncomment:
    // provideFirestore(() => getFirestore())
  ]
};