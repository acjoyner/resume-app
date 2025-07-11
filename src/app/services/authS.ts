import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  user,
  User,
} from '@angular/fire/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthS {
  user$: Observable<User | null>;

  constructor(private auth: Auth) {
    this.user$ = user(this.auth); // Observable for the current user
  }

  async googleSignIn() {
    try {
      await signInWithPopup(this.auth, new GoogleAuthProvider());
      console.log('Google Sign-In successful');
    } catch (error) {
      console.error('Google Sign-In failed:', error);
      throw error; // Re-throw to propagate the error
    }
  }

  async signOut() {
    try {
      await signOut(this.auth);
      console.log('Signed out successfully');
    } catch (error) {
      console.error('Sign out failed:', error);
      throw error;
    }
  }

  async getIdToken(): Promise<string | null> {
    const currentUser = await this.auth.currentUser;
    return currentUser ? await currentUser.getIdToken() : null;
  }
}
