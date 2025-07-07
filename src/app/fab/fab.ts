import { Component } from '@angular/core';
import { Modal } from '../services/modal';

@Component({
  selector: 'app-fab',
  imports: [],
  templateUrl: './fab.html',
  styleUrl: './fab.scss'
})
export class Fab {
    constructor(private modalService: Modal) { }

  openChatbot(): void {
    this.modalService.openModal();
  }
}
