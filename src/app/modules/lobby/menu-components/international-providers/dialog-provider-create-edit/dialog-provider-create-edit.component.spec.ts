import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProviderCreateEditComponent } from './dialog-provider-create-edit.component';

describe('DialogLabelCreateComponent', () => {
  let component: DialogProviderCreateEditComponent;
  let fixture: ComponentFixture<DialogProviderCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogProviderCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogProviderCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
