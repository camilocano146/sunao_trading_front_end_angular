import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortTarifsComponent } from './port-tarifs-international.component';

describe('PortTarifsComponent', () => {
  let component: PortTarifsComponent;
  let fixture: ComponentFixture<PortTarifsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortTarifsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortTarifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
