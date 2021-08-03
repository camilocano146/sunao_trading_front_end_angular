import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVerifyAccountComponent } from './dialog-verify-account.component';

describe('DialogVerifyAccountComponent', () => {
  let component: DialogVerifyAccountComponent;
  let fixture: ComponentFixture<DialogVerifyAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogVerifyAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVerifyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
