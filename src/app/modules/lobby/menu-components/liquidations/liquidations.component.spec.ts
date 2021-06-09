import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidationsComponent } from './liquidations.component';

describe('LiquidationComponent', () => {
  let component: LiquidationsComponent;
  let fixture: ComponentFixture<LiquidationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiquidationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
