import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AiChat } from '../services/ai-chat';
import { User } from 'firebase/auth';
import { AuthS } from '../services/authS';
import { getAuth, signInAnonymously } from '@angular/fire/auth';

@Component({
  selector: 'app-ask-me-anything',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './ask-me-anything.html',
  styleUrls: ['./ask-me-anything.scss']
})
export class AskMeAnything {
  userQuery: string = '';
  answer: string = '';
  isLoading: boolean = false;
  error: string = '';
  currentUser: User | null = null; // Store user data

  constructor(
    private aiChatService: AiChat,
    public authService: AuthS // Make public to use in template
  ) {}

  ngOnInit() {
    // Subscribe to user changes
    this.authService.user$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.error = ''; // Clear error if user logs in
      }
    });
    
  }



  async loginWithGoogle() {
    try {
      await this.authService.googleSignIn();
      // User observable will update currentUser automatically
    } catch (e) {
      this.error = 'Login failed. Please try again.';
      console.error(e);
    }
  }

  async logout() {
    try {
      await this.authService.signOut();
      this.answer = ''; // Clear answer on logout
    } catch (e) {
      this.error = 'Logout failed.';
      console.error(e);
    }
  }

  async submitQuery() {
    if (!this.userQuery.trim()) {
      this.error = 'Please enter a question.';
      return;
    }
    if (!this.currentUser) {
      this.error = 'You must be logged in to ask a question.';
      return;
    }

    this.isLoading = true;
    this.answer = '';
    this.error = '';

    try {
      (await this.aiChatService.askBlog(this.userQuery))
        .subscribe({
          next: (response) => {
            this.answer = response.answer;
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Error fetching AI answer:', err);
            this.error = 'Failed to get an answer. Please try again. (Check console for details)';
            this.isLoading = false;
          }
        });
    } catch (e: any) {
      this.error = e.message || 'Authentication error. Please log in.';
      this.isLoading = false;
    }
  }
}
