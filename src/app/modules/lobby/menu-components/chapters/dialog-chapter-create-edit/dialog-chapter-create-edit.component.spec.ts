import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChapterCreateEditComponent } from './dialog-chapter-create-edit.component';

describe('DialogChapterCreateEditComponent', () => {
  let component: DialogChapterCreateEditComponent;
  let fixture: ComponentFixture<DialogChapterCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogChapterCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogChapterCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
