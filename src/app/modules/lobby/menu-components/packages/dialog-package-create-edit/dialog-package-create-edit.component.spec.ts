import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPackageCreateEditComponent } from './dialog-package-create-edit.component';

describe('DialogPackageCreateEditComponent', () => {
  let component: DialogPackageCreateEditComponent;
  let fixture: ComponentFixture<DialogPackageCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPackageCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPackageCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
