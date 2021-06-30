import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalProvidersComponent } from './international-providers.component';

describe('InternationalProvidersComponent', () => {
  let component: InternationalProvidersComponent;
  let fixture: ComponentFixture<InternationalProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternationalProvidersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternationalProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
