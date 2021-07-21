import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogImportPortChargesComponent } from './dialog-import-port-charges.component';

describe('DialogImportPortChargesComponent', () => {
  let component: DialogImportPortChargesComponent;
  let fixture: ComponentFixture<DialogImportPortChargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogImportPortChargesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogImportPortChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
