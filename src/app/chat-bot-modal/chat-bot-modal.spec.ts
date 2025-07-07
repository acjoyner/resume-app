import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBotModal } from './chat-bot-modal';

describe('ChatBotModal', () => {
  let component: ChatBotModal;
  let fixture: ComponentFixture<ChatBotModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatBotModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatBotModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
