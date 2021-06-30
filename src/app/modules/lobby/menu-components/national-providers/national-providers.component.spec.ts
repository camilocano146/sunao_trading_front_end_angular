import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalProvidersComponent } from './national-providers.component';

describe('NationalProvidersComponent', () => {
  let component: NationalProvidersComponent;
  let fixture: ComponentFixture<NationalProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NationalProvidersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
