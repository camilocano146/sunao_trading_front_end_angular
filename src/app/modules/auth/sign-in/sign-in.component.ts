import {AfterContentChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {paddingBottom} from '../auth.component';
import {UserService} from '../../../services/user/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NotifyService} from '../../../services/notify/notify.service';
import {Router} from '@angular/router';
import {ManageLocalStorage} from '../../../utils/ManageLocalStorage';
import * as sha1 from 'js-sha1';
import {Credential} from '../../../models/Credential';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, AfterViewInit {
  formControlUser: FormControl = new FormControl('',
    [Validators.required, Validators.minLength(5), Validators.maxLength(40)]
  );
  formControlPassword: FormControl = new FormControl('',
    [Validators.required]
  );
  preload: boolean;
  hidePass = true;

  constructor(
    private translate: TranslateService,
    private userService: UserService,
    private notifyService: NotifyService,
    private router: Router
  ) {
    // (document.getElementsByClassName('img-background')[0] as HTMLElement).style.height = (document.getElementsByClassName('div-content')[0] as HTMLElement).style.height;
    // (document.getElementsByClassName('div-img-background')[0] as HTMLElement).style.filter = 'brightness(50%)';
    if (ManageLocalStorage.getToken()) {
      this.router.navigate(['lobby']);
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const div = document.getElementById('div-content-register-sign-in') as HTMLElement;
    (document.getElementsByClassName('img-background')[0] as HTMLElement).style.height = (div.scrollHeight + paddingBottom) + 'px';
    // div.style.paddingTop = `${(document.body.scrollHeight - div.scrollHeight) / 2}px`;
  }

  /**
   * Mensajes de error campo usuario
   */
  getErrorMessageUser(): string {
    return this.formControlUser.hasError('required')
      ? this.translate.instant('fields.required')
      : this.formControlUser.hasError('minlength')
        ? this.translate.instant('fields.min_5')
        : this.formControlUser.hasError('maxlength')
          ? this.translate.instant('fields.max_40')
          : '';
  }

  /**
   * Devuelve el mensaje de password incorrecto
   */
  getErrorMessagePassword(): string {
    return this.formControlPassword.hasError('required')
      ? this.translate.instant('fields.required')
      : '';
  }

  signIn(): void {
    if (this.formControlUser.valid && this.formControlPassword.valid) {
      this.preload = true;
      const credential: Credential = new Credential(
        this.formControlUser.value.toString().toLowerCase(),
        sha1(this.formControlPassword.value)
      );
      this.userService.login(credential).subscribe(
        value => {
          // const user: User = value.body.user;
          this.userService.saveLocalStorageToken(value.access_token);
          this.router.navigate(['lobby']);
          this.notifyService.clear();
          this.notifyService.showSuccessSnapshot(this.translate.instant('auth.sign_in.sign_ok'));
        }, (httpErrorResponse: HttpErrorResponse) => {
          this.preload = false;
          console.log(httpErrorResponse.error);
          const errorMessage = httpErrorResponse.error?.error?.toUpperCase();
          if (httpErrorResponse.status === 400) {
            if (errorMessage?.includes('invalid_grant'.toUpperCase())) {
              this.notifyService.showErrorSnapshot(this.translate.instant('auth.sign_in.sign_error'));
            } else if (errorMessage?.includes('user is lock'.toUpperCase())) {
              this.notifyService.showErrorSnapshot(this.translate.instant('auth.sign_in.look_account'));
            }  else {
              this.notifyService.showErrorSnapshot(this.translate.instant('errors.connection_error'));
            }
          } else if (httpErrorResponse.status === 401) {
            // if (errorMessage?.includes('unverify email'.toUpperCase())) {
            //   this.router.navigate(['activate-account']);
            //   this.notifyService.showWarningSnapshot(this.translate.instant('auth.sign_in.email_not_verifies'));
            // }
            if (errorMessage?.includes('user don\'t found'.toUpperCase())) {
              this.notifyService.showErrorSnapshot(this.translate.instant('auth.sign_in.sign_error'));
            }
          } else {
            this.notifyService.showErrorSnapshot(this.translate.instant('errors.connection_error'));
          }
        }
      );
    } else {
      this.formControlUser.markAsTouched();
      this.formControlPassword.markAsTouched();
    }
  }
}
