import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRegisterQuizComponent } from './dialog-register-quiz.component';

describe('DialogRegisterQuizComponent', () => {
  let component: DialogRegisterQuizComponent;
  let fixture: ComponentFixture<DialogRegisterQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRegisterQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRegisterQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
