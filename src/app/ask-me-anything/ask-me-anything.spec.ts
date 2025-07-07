import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskMeAnything } from './ask-me-anything';

describe('AskMeAnything', () => {
  let component: AskMeAnything;
  let fixture: ComponentFixture<AskMeAnything>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AskMeAnything]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskMeAnything);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
