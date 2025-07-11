import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Modal {
  private isModalOpenSubject = new BehaviorSubject<boolean>(false);
  isModalOpen$: Observable<boolean> = this.isModalOpenSubject.asObservable();

  constructor() { }

  openModal() {
    this.isModalOpenSubject.next(true);
  }

  closeModal() {
    this.isModalOpenSubject.next(false);
  }
}
