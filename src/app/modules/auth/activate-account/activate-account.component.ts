import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {paddingBottom} from '../auth.component';
import {UserService} from '../../../services/user/user.service';
import {NotifyService} from '../../../services/notify/notify.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit, AfterViewInit {
  formControlCode: FormControl = new FormControl('',
    [Validators.required, Validators.minLength(5), Validators.maxLength(15)]
  );
  preload: boolean;
  codeSent: boolean;

  constructor(
    private translate: TranslateService,
    private userService: UserService,
    private notifyService: NotifyService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const div = document.getElementById('div-content-active-account') as HTMLElement;
    (document.getElementsByClassName('img-background')[0] as HTMLElement).style.height = (div.scrollHeight + paddingBottom) + 'px';
    // div.style.paddingTop = `${(document.body.scrollHeight - div.scrollHeight) / 2}px`;
  }

  /**
   * Mensajes de error campo usuario
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

  goToLogin() {
    this.router.navigate(['']);
  }
}
