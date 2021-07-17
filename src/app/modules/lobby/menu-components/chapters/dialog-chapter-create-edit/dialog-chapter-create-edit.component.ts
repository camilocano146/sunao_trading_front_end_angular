import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {FormControl, Validators} from '@angular/forms';
import {NotifyService} from '../../../../../services/notify/notify.service';
import {HttpErrorResponse} from '@angular/common/http';

import {DataDialogChapter} from '../chapters.component';
import { ChapterService } from 'src/app/services/chapter/chapter.service';
import { Chapter } from 'src/app/models/Chapter';

@Component({
  selector: 'app-dialog-chapter-create-edit',
  templateUrl: './dialog-chapter-create-edit.component.html',
  styleUrls: ['./dialog-chapter-create-edit.component.scss']
})
export class DialogChapterCreateEditComponent implements OnInit {

  public preload: boolean;
  public preloadSave: boolean;
  maxLengthName = 100;
  public formControlName: FormControl = new FormControl(
    null, [Validators.required, Validators.minLength(3), Validators.maxLength(this.maxLengthName)]
  );

  public formControlCode: FormControl = new FormControl(
    null, [Validators.required,  Validators.maxLength(5)]
  );

  constructor(
    private chapterService: ChapterService,
    public dialogRef: MatDialogRef<DialogChapterCreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialogChapter,
    private translate: TranslateService,
    private notifyService: NotifyService,
  ) {
    if (this.data.dataEdit) {
      this.formControlName.setValue(data.dataEdit.name);
      this.formControlCode.setValue(data.dataEdit.code);
    }
  }

  ngOnInit(): void {
  }


  saveOrEdit(): void {
    if (this.formControlName.valid) {
      this.preloadSave = true;
      const body: Chapter = {
        name: this.formControlName.value,
        code: this.formControlCode.value
      };
      let observable;

      if (this.data.dataEdit) {
        observable = this.chapterService.edit(this.data.dataEdit.id, body);
      } else {
        observable = this.chapterService.register(body);
      }
      observable.subscribe(res => {
        this.preloadSave = false;
        this.notifyService.showSuccessCreateOrEdit(!!this.data.dataEdit);
        this.dialogRef.close('created');
      }, (error: HttpErrorResponse) => {
        const errors_code = error.error?.code;
        if (errors_code?.toString()?.toUpperCase()?.includes('chapter with this code already exists.'.toUpperCase())) {
          this.notifyService.showErrorSnapshot(this.translate.instant('chapter.errors.code_unique'));
        } else {
          this.notifyService.showErrorSnapshot(this.translate.instant('errors.connection_error'));
        }

        this.preloadSave = false;
      });
    } else {
      this.formControlName.markAsTouched();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getErrorMessageName(): string {
    return this.formControlName.hasError('required')
      ? this.translate.instant('fields.required')
      : this.formControlName.hasError('minlength')
        ? this.translate.instant('fields.min_3')
        : this.formControlName.hasError('maxlength')
          ? this.translate.instant('fields.max_50')
          : '';
  }


}
