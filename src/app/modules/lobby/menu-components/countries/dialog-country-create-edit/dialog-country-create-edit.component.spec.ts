import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCountryCreateEditComponent } from './dialog-country-create-edit.component';

describe('DialogLabelCreateComponent', () => {
  let component: DialogCountryCreateEditComponent;
  let fixture: ComponentFixture<DialogCountryCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCountryCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCountryCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
