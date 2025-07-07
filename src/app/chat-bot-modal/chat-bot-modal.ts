import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AskMeAnything } from '../ask-me-anything/ask-me-anything';
import { Modal } from '../services/modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-bot-modal',
  imports: [CommonModule,AskMeAnything],
  standalone: true,
  templateUrl: './chat-bot-modal.html',
  styleUrl: './chat-bot-modal.scss'
})
export class ChatBotModal {
   isOpen: boolean = false;
  private modalSubscription!: Subscription;

  constructor(private modalService: Modal) { }

  ngOnInit(): void {
    this.modalSubscription = this.modalService.isModalOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

  ngOnDestroy(): void {
    this.modalSubscription.unsubscribe();
  }

  closeModal(): void {
    this.modalService.closeModal();
  }
}
