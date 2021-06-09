import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {UserService} from '../../../../services/user/user.service';
import {NotifyService} from '../../../../services/notify/notify.service';
import {Router} from '@angular/router';
import {Credential} from '../../../../models/Credential';
import {HttpErrorResponse} from '@angular/common/http';
import * as sha1 from 'js-sha1';

@Component({
  selector: 'app-dialog-resume',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.scss']
})
export class DialogLoginComponent implements OnInit {
  formControlUser: FormControl = new FormControl('',
    [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(40)]
  );
  formControlPassword: FormControl = new FormControl('',
    [Validators.required]
  );
  preload: boolean;
  hidePass = true;
  showLogin = true;
  showRegister: boolean;

  constructor(
    private translate: TranslateService,
    private userService: UserService,
    private notifyService: NotifyService,
    private router: Router,
    public matDialogRef: MatDialogRef<DialogLoginComponent>
  ) { }

  ngOnInit(): void {
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

  register(): void {
    if (this.formControlUser.value) {
      this.formControlUser.setValue(this.formControlUser.value.toString().toLowerCase().trim());
    }
    if (this.formControlUser.valid && this.formControlPassword.valid) {
      this.preload = true;
      const credential: Credential = new Credential(
        this.formControlUser.value.toString().toLowerCase(),
        sha1(this.formControlPassword.value)
      );
      credential.email = this.formControlUser.value.toString().toLowerCase();
      this.userService.register(credential).subscribe(
        value => {
          // this.router.navigate(['/activate-account']);
          // this.userService.saveLocalStorageToken(value.body.token);
          // this.router.navigate(['lobby']);
          this.userService.saveLocalStorageToken(value.access_token);
          this.userService.saveLocalStorageUser(value.user);
          this.router.navigate(['lobby']);
          this.notifyService.showSuccessSnapshot(this.translate.instant('auth.register.create_ok'));
          // this.notifyService.showWarningSnapshot(this.translate.instant('auth.register.email_not_verifies'));
        }, (error: HttpErrorResponse) => {
          const errorEmail = error.error;
          if (errorEmail?.email) {
            this.notifyService.showErrorSnapshot(this.translate.instant('errors.unique_email'));
          } else {
            this.notifyService.showErrorSnapshot(this.translate.instant('errors.connection_error'));
          }
          this.preload = false;
        }
      );
    } else {
      this.formControlUser.markAsTouched();
      this.formControlPassword.markAsTouched();
    }
  }

  actionShowRegister(): void {
    this.showLogin = false;
    this.showRegister = true;
    this.formControlUser.reset();
    this.formControlPassword.reset();
    this.hidePass = true;
  }

  actionShowLogin(): void {
    this.showLogin = true;
    this.showRegister = false;
    this.formControlUser.reset();
    this.formControlPassword.reset();
    this.hidePass = true;
  }
}
