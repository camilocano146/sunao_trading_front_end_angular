import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProductDetailsComponent } from './dialog-product-details.component';

describe('DialogProductDetailsComponent', () => {
  let component: DialogProductDetailsComponent;
  let fixture: ComponentFixture<DialogProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogProductDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
