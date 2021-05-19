import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {paddingBottom} from '../auth.component';
import {UserService} from '../../../services/user/user.service';
import {NotifyService} from '../../../services/notify/notify.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './request-code.component.html',
  styleUrls: ['./request-code.component.scss']
})
export class RequestCodeComponent implements OnInit, AfterViewInit {
  formControlEmail: FormControl = new FormControl('',
    [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(40)]
  );
  preload: boolean;

  constructor(private translate: TranslateService,
              private userService: UserService,
              private notifyService: NotifyService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const div = document.getElementById('div-content-request-code') as HTMLElement;
    (document.getElementsByClassName('img-background')[0] as HTMLElement).style.height = (div.scrollHeight + paddingBottom) + 'px';
    // div.style.paddingTop = `${(document.body.scrollHeight - div.scrollHeight) / 2}px`;
  }

  /**
   * Mensajes de error campo usuario
   */
  getErrorMessageEmail(): string {
    return this.formControlEmail.hasError('required')
      ? this.translate.instant('fields.required')
      : this.formControlEmail.hasError('email')
        ? this.translate.instant('fields.invalid_email')
        : this.formControlEmail.hasError('minlength')
          ? this.translate.instant('fields.min_5')
          : this.formControlEmail.hasError('maxlength')
            ? this.translate.instant('fields.max_40')
            : '';
  }

  requestCode(): void {
    if (this.formControlEmail.value) {
      this.formControlEmail.setValue(this.formControlEmail.value.toString().toLowerCase().trim());
    }
    if (this.formControlEmail.valid) {
      this.preload = true;
      const body = {
        email: this.formControlEmail.value
      };
      this.userService.requestCode(body).subscribe(
        value => {
          this.preload = false;
          this.notifyService.showSuccessSnapshot(this.translate.instant('auth.request_code.email_send'));
          this.router.navigate(['/activate-account']);
        }, error => {
          this.preload = false;
          if (error.status === 400) {
            const errorMessage = error.error?.body?.mensaje?.toString()?.toUpperCase();
            if (errorMessage?.includes('Email no encontrado'.toUpperCase())) {
              this.notifyService.showErrorSnapshot(this.translate.instant('errors.email_not_found'));
            } else {
              this.notifyService.showErrorSnapshot(this.translate.instant('errors.connection_error'));
            }
          } else {
            this.notifyService.showErrorSnapshot(this.translate.instant('errors.connection_error'));
          }
        }
      );
    } else {
      this.formControlEmail.markAsTouched();
    }
  }
}
