import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExportReportComponent } from './dialog-export-report.component';

describe('CreateTransactionComponent', () => {
  let component: DialogExportReportComponent;
  let fixture: ComponentFixture<DialogExportReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogExportReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogExportReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
