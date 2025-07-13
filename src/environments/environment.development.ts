
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const environment = {
  production: false,
  firebase: {
    apiKey: 'Add your key here',
    authDomain: 'resume-app-3c130.firebaseapp.com',
    databaseURL: 'https://resume-app-3c130-default-rtdb.firebaseio.com',
    projectId: 'resume-app-3c130',
    storageBucket: 'resume-app-3c130.firebasestorage.app',
    messagingSenderId: '534841377040',
    appId: '1:534841377040:web:9018ced7abece487262595',
    measurementId: 'G-CSEMVESWW3',
  },
};


// Initialize Firebase
const app = initializeApp(environment.firebase);
const analytics = getAnalytics(app);
