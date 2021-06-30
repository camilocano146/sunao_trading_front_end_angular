import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPortCreateEditComponent } from './dialog-port-create-edit.component';

describe('DialogPortCreateEditComponent', () => {
  let component: DialogPortCreateEditComponent;
  let fixture: ComponentFixture<DialogPortCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPortCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPortCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
