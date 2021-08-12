import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUserChangeRolesComponent } from './dialog-user-change-roles.component';

describe('DialogUserChangeRolesComponent', () => {
  let component: DialogUserChangeRolesComponent;
  let fixture: ComponentFixture<DialogUserChangeRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUserChangeRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUserChangeRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
