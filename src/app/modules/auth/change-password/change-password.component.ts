import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {paddingBottom} from '../auth.component';
import {UserService} from '../../../services/user/user.service';
import {ChangePassword} from '../../../models/User';
import {NotifyService} from '../../../services/notify/notify.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as sha1 from 'js-sha1';

@Component({
  selector: 'app-register',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, AfterViewInit {
  formControlCode: FormControl = new FormControl('',
    [Validators.required, Validators.minLength(5), Validators.maxLength(15)]
  );
  formControlPassword: FormControl = new FormControl('',
    [Validators.required, Validators.minLength(8), Validators.maxLength(100)]
  );
  formControlConfirmPassword: FormControl = new FormControl('',
    [Validators.required, Validators.minLength(8), Validators.maxLength(100)]
  );
  preload: boolean;

  constructor(
    private translate: TranslateService,
    private userService: UserService,
    private notifyService: NotifyService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    // (document.getElementsByClassName('div-img-background')[0] as HTMLElement).style.filter = 'brightness(10%)';

    this.activatedRoute.queryParams.subscribe(params => {
        const code = params.code;
        this.formControlCode.setValue(code);
      }
    );
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const div = document.getElementById('div-content-change-password') as HTMLElement;
    (document.getElementsByClassName('img-background')[0] as HTMLElement).style.height = (div.scrollHeight + paddingBottom) + 'px';
    // div.style.paddingTop = `${(document.body.scrollHeight - div.scrollHeight) / 2}px`;
  }

  /**
   * Devuelve el mensaje de password incorrecto
   */
  getErrorMessagePassword(): string {
    return this.formControlPassword.hasError('required')
      ? this.translate.instant('fields.required')
      : this.formControlPassword.hasError('minlength')
        ? this.translate.instant('fields.min_8')
        : this.formControlPassword.hasError('maxlength')
          ? this.translate.instant('fields.max_100')
          : '';
  }

  /**
   * Devuelve el mensaje de password incorrecto
   */
  getErrorMessageConfirmPassword(): string {
    return this.formControlConfirmPassword.hasError('required')
      ? this.translate.instant('fields.required')
      : this.formControlConfirmPassword.hasError('minlength')
        ? this.translate.instant('fields.min_8')
        : this.formControlConfirmPassword.hasError('maxlength')
          ? this.translate.instant('fields.max_100')
          : '';
  }

  /**
   * Mensajes de error campo código
   */
  getErrorMessageCode(): string {
    return this.formControlCode.hasError('required')
      ? this.translate.instant('fields.required')
      : this.formControlCode.hasError('minlength')
        ? this.translate.instant('fields.min_5')
        : this.formControlCode.hasError('maxlength')
          ? this.translate.instant('fields.max_15')
          : '';
  }

  changePassword(): void {
    if (this.formControlCode.value) {
      this.formControlCode.setValue(this.formControlCode.value.toString().trim());
    }
    if (this.formControlCode.valid && this.formControlPassword.valid && this.formControlConfirmPassword.valid) {
      if (this.formControlPassword.value !== this.formControlConfirmPassword.value) {
        this.notifyService.showErrorSnapshot(this.translate.instant('auth.change_password.different_passwords'));
        return;
      }
      this.preload = true;
      const changePassword: ChangePassword = {
        token: this.formControlCode.value,
        password_1: sha1(this.formControlPassword.value),
        password_2: sha1(this.formControlConfirmPassword.value),
      };
      this.userService.changePassword(changePassword).subscribe(
        value => {
          this.preload = false;
          this.notifyService.showSuccessSnapshot(this.translate.instant('auth.change_password.changed'));
          this.router.navigate(['']);
        }, error => {
          this.preload = false;
          console.log(error.error);
          if (error.status === 400 || error.status === 404 || error.status === 422) {
            const errorMessage = error.error.detail?.toString().toUpperCase();
            if (errorMessage?.includes('unknown code'.toUpperCase())) {
              this.notifyService.showErrorSnapshot(this.translate.instant('auth.change_password.code_error'));
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
      this.formControlPassword.markAsTouched();
      this.formControlConfirmPassword.markAsTouched();
    }
  }
}
