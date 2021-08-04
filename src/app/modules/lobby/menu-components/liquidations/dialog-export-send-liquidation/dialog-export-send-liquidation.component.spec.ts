import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExportSendLiquidationComponent } from './dialog-export-send-liquidation.component';

describe('DialogResumeComponent', () => {
  let component: DialogExportSendLiquidationComponent;
  let fixture: ComponentFixture<DialogExportSendLiquidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogExportSendLiquidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogExportSendLiquidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
