import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChangeNameDocumentComponent } from './dialog-change-name-document.component';

describe('ChangeEmailComponent', () => {
  let component: DialogChangeNameDocumentComponent;
  let fixture: ComponentFixture<DialogChangeNameDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogChangeNameDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogChangeNameDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
