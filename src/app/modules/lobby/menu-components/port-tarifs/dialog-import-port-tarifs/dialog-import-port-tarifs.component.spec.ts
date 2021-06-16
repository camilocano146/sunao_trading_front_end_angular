import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogImportPortTarifsComponent } from './dialog-import-port-tarifs.component';

describe('DialogExportPortTarifsComponent', () => {
  let component: DialogImportPortTarifsComponent;
  let fixture: ComponentFixture<DialogImportPortTarifsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogImportPortTarifsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogImportPortTarifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
