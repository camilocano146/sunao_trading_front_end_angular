import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogResumeComponent } from './dialog-resume.component';

describe('DialogResumeComponent', () => {
  let component: DialogResumeComponent;
  let fixture: ComponentFixture<DialogResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogResumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
