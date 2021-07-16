import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import {ConstantsApp} from '../../../../../utils/ConstantsApp';
import {UserService} from '../../../../../services/user/user.service';
import {NotifyService} from '../../../../../services/notify/notify.service';
import {TranslateService} from '@ngx-translate/core';
import * as sha1 from 'js-sha1';

@Component({
  selector: 'app-change-email',
  templateUrl: './dialog-change-password.component.html',
  styleUrls: ['./dialog-change-password.component.scss']
})
export class DialogChangePasswordComponent implements OnInit {
  formControlCurrent: FormControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]);
  formControlNew: FormControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]);
  formControlNewConfirm: FormControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]);
  preload: boolean;
  hidePass1 = true;
  hidePass2 = true;
  hidePass3 = true;

  constructor(
    public userService: UserService,
    public notifyService: NotifyService,
    public matDialogRef: MatDialogRef<DialogChangePasswordComponent>,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
  }

  getErrorMessagePassword(formControl: FormControl): string {
    return formControl.hasError('required')
      ? this.translate.instant('fields.required')
      : formControl.hasError('minlength')
        ? this.translate.instant('fields.min_8')
        : formControl.hasError('maxlength')
          ? this.translate.instant('fields.max_100')
          : '';
  }

  changePassword(): void {
    const current = this.formControlCurrent.value?.trim();
    const passNew = this.formControlNew.value?.trim();
    if (this.formControlCurrent.valid && this.formControlNew.valid && this.formControlNewConfirm.valid && !this.isNotSomePassword()) {
      this.preload = true;
      const body = {
        pass_current: sha1(current),
        pass_new: sha1(passNew)
      };
      this.userService.updateUserPassword(body).subscribe(res => {
        this.notifyService.showSuccessSnapshot('Contraseña modificada');
        this.matDialogRef.close(res);
        this.preload = false;
      }, error => {
        this.notifyService.showErrorSnapshot('No fué posible actualizar la contraseña, por favor intente nuevamente');
        this.preload = false;
      });
    } else {
      this.formControlCurrent.markAsTouched();
      this.formControlNew.markAsTouched();
      this.formControlNewConfirm.markAsTouched();
    }
  }

  isNotSomePassword(): boolean {
    if (this.formControlNew.invalid || this.formControlNewConfirm.invalid) {
      return false;
    }
    return this.formControlNew.value !== this.formControlNewConfirm.value;
  }
}
