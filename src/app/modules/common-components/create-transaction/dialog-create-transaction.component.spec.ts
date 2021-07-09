import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateTransactionComponent } from './dialog-create-transaction.component';

describe('CreateTransactionComponent', () => {
  let component: DialogCreateTransactionComponent;
  let fixture: ComponentFixture<DialogCreateTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCreateTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
