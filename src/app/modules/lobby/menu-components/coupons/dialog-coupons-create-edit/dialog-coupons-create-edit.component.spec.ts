import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCouponsCreateEditComponent } from './dialog-coupons-create-edit.component';

describe('DialogCouponsCreateEditComponent', () => {
  let component: DialogCouponsCreateEditComponent;
  let fixture: ComponentFixture<DialogCouponsCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCouponsCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCouponsCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
