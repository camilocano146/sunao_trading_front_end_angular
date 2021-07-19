import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainersTypeComponent } from './containers-type.component';

describe('ContainersTypeComponent', () => {
  let component: ContainersTypeComponent;
  let fixture: ComponentFixture<ContainersTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainersTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainersTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
