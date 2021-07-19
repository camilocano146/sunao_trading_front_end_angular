import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortChargeComponent } from './port-charge.component';

describe('PortChargeComponent', () => {
  let component: PortChargeComponent;
  let fixture: ComponentFixture<PortChargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortChargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
