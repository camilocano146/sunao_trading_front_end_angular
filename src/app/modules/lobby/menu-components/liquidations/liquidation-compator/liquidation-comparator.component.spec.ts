import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidationComparatorComponent } from './liquidation-comparator.component';

describe('DashboardsComponent', () => {
  let component: LiquidationComparatorComponent;
  let fixture: ComponentFixture<LiquidationComparatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiquidationComparatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidationComparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
