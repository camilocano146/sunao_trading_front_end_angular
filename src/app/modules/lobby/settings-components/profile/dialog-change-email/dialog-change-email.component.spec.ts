import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChangeEmailComponent } from './dialog-change-email.component';

describe('ChangeEmailComponent', () => {
  let component: DialogChangeEmailComponent;
  let fixture: ComponentFixture<DialogChangeEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogChangeEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogChangeEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
