import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import { NotifyService } from 'src/app/services/notify/notify.service';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-verify-account',
  templateUrl: './dialog-verify-account.component.html',
  styleUrls: ['./dialog-verify-account.component.scss']
})
export class DialogVerifyAccountComponent implements OnInit {
  formControlCode: FormControl = new FormControl('',
    [Validators.required, Validators.minLength(5), Validators.maxLength(15)]
  );
  preload: boolean;
  codeSent: boolean;

  constructor(
    private translate: TranslateService,
    private userService: UserService,
    private notifyService: NotifyService,
    public matDialogRef: MatDialogRef<DialogVerifyAccountComponent>,

  ) { }

  ngOnInit(): void {
  }


  getErrorMessageCode(): string {
    return this.formControlCode.hasError('required')
      ? this.translate.instant('fields.required')
      : this.formControlCode.hasError('minlength')
        ? this.translate.instant('fields.min_5')
        : this.formControlCode.hasError('maxlength')
          ? this.translate.instant('fields.max_15')
          : '';
  }

  activateAccount(): void {
    if (this.formControlCode.value) {
      this.formControlCode.setValue(this.formControlCode.value.toString().trim());
    }
    if (this.formControlCode.valid) {
      this.preload = true;
      this.codeSent = false;
      const body = {
        code: this.formControlCode.value
      };
      this.userService.activateAccount(body).subscribe(
        value => {
          this.codeSent = true;
          this.preload = false;
          this.notifyService.showSuccessSnapshot(this.translate.instant('auth.activate_account.account_activated'));
        }, error => {
          this.preload = false;
          if (error.status === 400 || error.status === 404) {
            const errorMessasge = error.error?.detail?.toString()?.toUpperCase();
            if (errorMessasge?.includes('code not found'.toUpperCase())) {
              this.notifyService.showErrorSnapshot(this.translate.instant('auth.activate_account.code_error'));
            } else {
              this.notifyService.showErrorSnapshot(this.translate.instant('errors.connection_error'));
            }
          } else {
            this.notifyService.showErrorSnapshot(this.translate.instant('errors.connection_error'));
          }
        }
      );
    } else {
      this.formControlCode.markAsTouched();
    }
  }
}
