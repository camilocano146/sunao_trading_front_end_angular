import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {UserService} from '../../../../services/user/user.service';
import {NotifyService} from '../../../../services/notify/notify.service';
import {Router} from '@angular/router';
import {Credential} from '../../../../models/Credential';
import {HttpErrorResponse} from '@angular/common/http';
import * as sha1 from 'js-sha1';
import {DialogTermsAndConditionsUserComponent} from '../../../auth/dialog-terms-and-conditions-user/dialog-terms-and-conditions-user.component';
import { DialogRegisterQuizComponent } from 'src/app/modules/auth/register/dialog-register-quiz/dialog-register-quiz.component';
import { ManageSessionStorage } from 'src/app/utils/ManageSessionStorage';

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

  formControlEmail: FormControl = new FormControl('',
    [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(40)]
  );

  formControlName: FormControl = new FormControl('',
    [Validators.required, Validators.minLength(4), Validators.maxLength(100)]
  );

  formControlLastName: FormControl = new FormControl('',
    [Validators.maxLength(100)]
  );

  formControlNit: FormControl = new FormControl('',
    [Validators.required, Validators.minLength(4), Validators.maxLength(100)]
  );

  formControlCountry: FormControl = new FormControl('',
    [Validators.required, Validators.minLength(4), Validators.maxLength(100)]
  );
  formControlPhone: FormControl = new FormControl('',
    [Validators.required, Validators.minLength(4), Validators.maxLength(100)]
  );


  preload: boolean;
  hidePass = true;
  showLogin = true;
  showRegister: boolean;
  checkTermsAndConditions: boolean;

  checkQuiz:boolean;
  questions:any;

  constructor(
    private translate: TranslateService,
    private userService: UserService,
    private notifyService: NotifyService,
    private router: Router,
    public matDialogRef: MatDialogRef<DialogLoginComponent>,
    public matDialog: MatDialog
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

  /**
   * Devuelve el mensaje de nombre incorrecto
   */
   getErrorMessageName(): string {
    return this.formControlName.hasError('required')
      ? this.translate.instant('fields.required')
      : this.formControlName.hasError('minlength')
        ? this.translate.instant('fields.min_4')
        : this.formControlName.hasError('maxlength')
          ? this.translate.instant('fields.max_100')
          : '';
  }

  /**
   * Devuelve el mensaje de nombre incorrecto
   */
   getErrorMessageNit(): string {
    return this.formControlNit.hasError('required')
      ? this.translate.instant('fields.required')
      : this.formControlNit.hasError('minlength')
        ? this.translate.instant('fields.min_4')
        : this.formControlNit.hasError('maxlength')
          ? this.translate.instant('fields.max_100')
          : '';
  }

  getErrorMessageCountry(): string {
    return this.formControlCountry.hasError('required')
      ? this.translate.instant('fields.required')
      : this.formControlCountry.hasError('minlength')
        ? this.translate.instant('fields.min_4')
        : this.formControlCountry.hasError('maxlength')
          ? this.translate.instant('fields.max_100')
          : '';
  }
  getErrorMessagePhone(): string {
    return this.formControlPhone.hasError('required')
      ? this.translate.instant('fields.required')
      : this.formControlPhone.hasError('minlength')
        ? this.translate.instant('fields.min_4')
        : this.formControlPhone.hasError('maxlength')
          ? this.translate.instant('fields.max_100')
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
          this.notifyService.clear();
          ManageSessionStorage.setListCompareLiquidations([]);
          this.notifyService.showSuccessSnapshot(this.translate.instant('auth.sign_in.sign_ok'));
          this.matDialogRef.close(value);
        }, (httpErrorResponse: HttpErrorResponse) => {
          this.preload = false;
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
    if (this.formControlEmail.value) {
      this.formControlEmail.setValue(this.formControlEmail.value.toString().toLowerCase().trim());
    }
    if (!this.checkTermsAndConditions) {
      this.notifyService.showErrorSnapshot('Debes aceptar los términos y condiciones');
    }
    if(!this.checkQuiz){
      this.notifyService.showErrorSnapshot('Debes contestar las preguntas para registrarte.');
    }
    this.formControlLastName.clearValidators();
    this.formControlLastName.setValidators([Validators.maxLength(100)]);
    this.formControlLastName.updateValueAndValidity();

    if (this.formControlEmail.valid && 
      this.formControlPassword.valid && 
      this.checkTermsAndConditions && 
      this.checkQuiz &&
      this.formControlName.valid &&
      this.formControlLastName.valid &&
      this.formControlNit.valid &&
      this.formControlCountry.valid &&
      this.formControlPhone.valid) {
      this.preload = true;
      const credential: Credential = new Credential(
        this.formControlEmail.value.toString().toLowerCase(),
        sha1(this.formControlPassword.value)
      );
      let info_user ={
        first_name: this.formControlName.value,
        last_name:this.formControlLastName.value?this.formControlLastName.value:'',
        nit: this.formControlNit.value,
        country:this.formControlCountry.value,
        phone: this.formControlPhone.value
      }
      credential.email = this.formControlEmail.value.toString().toLowerCase();
      credential.questions=this.questions;
      credential.info_user= info_user;
      

      this.userService.register(credential).subscribe(
        value => {
          this.userService.saveLocalStorageToken(value.access_token);
          this.userService.saveLocalStorageUser(value.user);
          this.matDialogRef.close(value);
          ManageSessionStorage.setListCompareLiquidations([]);
          this.notifyService.showSuccessSnapshot(this.translate.instant('auth.register.create_ok'));
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
      this.formControlEmail.markAsTouched();
      this.formControlPassword.markAsTouched();
      this.formControlName.markAllAsTouched();
      this.formControlLastName.markAllAsTouched();
      this.formControlNit.markAllAsTouched();
      this.formControlCountry.markAllAsTouched();
      this.formControlPhone.markAllAsTouched();
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

  openDialogTermsAndConditions(event: MouseEvent): void {
    if (!this.checkTermsAndConditions) {
      event.preventDefault();
      const dialogRef = this.matDialog.open(DialogTermsAndConditionsUserComponent, {
        width: window.innerWidth < 500 ? '96vw' : '90vw',
        maxWidth: '96vw',
        height: 'max-content',
      });
      dialogRef.afterClosed().subscribe(result => {
        this.checkTermsAndConditions = !!result;
      });
    }
  }

  openDialogQuiz(event:MouseEvent): void{
    if (!this.checkQuiz) {
      event.preventDefault();
      let width='35vw';
      if (window.innerWidth < 500){
        width='110vw';
      }else if (window.innerWidth > 500 && window.innerWidth < 950 ){
        width='60vw';
      }
      const dialogRef = this.matDialog.open(DialogRegisterQuizComponent, {
        width: width,
        maxWidth: '110vw',
        height: 'max-content',
        autoFocus:false
      });
      dialogRef.afterClosed().subscribe(result => {
        this.questions=result;
        this.checkQuiz=!!result;
        
      });
    }
  }
}
