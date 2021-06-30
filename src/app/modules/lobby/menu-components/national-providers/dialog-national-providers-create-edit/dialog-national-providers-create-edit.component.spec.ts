import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNationalProvidersCreateEditComponent } from './dialog-national-providers-create-edit.component';

describe('DialogNationalProvidersCreateEditComponent', () => {
  let component: DialogNationalProvidersCreateEditComponent;
  let fixture: ComponentFixture<DialogNationalProvidersCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNationalProvidersCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNationalProvidersCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
