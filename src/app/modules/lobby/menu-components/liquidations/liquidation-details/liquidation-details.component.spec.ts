import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidationDetailsComponent } from './liquidation-details.component';

describe('DashboardsComponent', () => {
  let component: LiquidationDetailsComponent;
  let fixture: ComponentFixture<LiquidationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiquidationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
