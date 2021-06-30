import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProductCreateEditComponent } from './dialog-product-create-edit.component';

describe('DialogProductCreateEditComponent', () => {
  let component: DialogProductCreateEditComponent;
  let fixture: ComponentFixture<DialogProductCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogProductCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogProductCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
