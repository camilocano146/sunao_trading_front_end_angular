import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTermsAndConditionsUserComponent } from './dialog-terms-and-conditions-user.component';

describe('DialogLoginComponent', () => {
  let component: DialogTermsAndConditionsUserComponent;
  let fixture: ComponentFixture<DialogTermsAndConditionsUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogTermsAndConditionsUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTermsAndConditionsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
