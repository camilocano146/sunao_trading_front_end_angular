import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLocationCreateEditComponent } from './dialog-location-create-edit.component';

describe('DialogLabelCreateComponent', () => {
  let component: DialogLocationCreateEditComponent;
  let fixture: ComponentFixture<DialogLocationCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogLocationCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLocationCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
