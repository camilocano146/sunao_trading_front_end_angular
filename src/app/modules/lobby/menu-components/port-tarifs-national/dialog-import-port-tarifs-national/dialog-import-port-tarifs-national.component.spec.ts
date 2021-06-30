import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogImportPortTarifsNationalComponent } from './dialog-import-port-tarifs-national.component';

describe('DialogImportPortTarifsNationalComponent', () => {
  let component: DialogImportPortTarifsNationalComponent;
  let fixture: ComponentFixture<DialogImportPortTarifsNationalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogImportPortTarifsNationalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogImportPortTarifsNationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
