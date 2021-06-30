import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortTarifsNationalComponent } from './port-tarifs-national.component';

describe('PortTarifsNationalComponent', () => {
  let component: PortTarifsNationalComponent;
  let fixture: ComponentFixture<PortTarifsNationalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortTarifsNationalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortTarifsNationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
