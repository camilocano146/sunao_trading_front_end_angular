import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {paddingBottom} from '../auth.component';
import {User} from '../../../models/User';
import {UserService} from '../../../services/user/user.service';
import {NotifyService} from '../../../services/notify/notify.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import * as sha1 from 'js-sha1';
import {Credential} from '../../../models/Credential';
import {DialogTermsAndConditionsUserComponent} from '../dialog-terms-and-conditions-user/dialog-terms-and-conditions-user.component';
import { DialogRegisterQuizComponent } from './dialog-register-quiz/dialog-register-quiz.component';
import { ManageSessionStorage } from 'src/app/utils/ManageSessionStorage';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, AfterViewInit {
  formControlEmail: FormControl = new FormControl('',
    [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(40)]
  );
  formControlPassword: FormControl = new FormControl('',
    [Validators.required]
  );

  formControlName: FormControl = new FormControl('',
    [Validators.required, Validators.minLength(4), Validators.maxLength(100)]
  );

  formControlLastName: FormControl = new FormControl('');

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
  checkTermsAndConditions: boolean;
  checkQuiz:boolean;
  hidePass = true;

  questions:any;

  constructor(
    private translate: TranslateService,
    private userService: UserService,
    private notifyService: NotifyService,
    private router: Router,
    private matDialog: MatDialog,
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const div = document.getElementById('div-content-register') as HTMLElement;
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
          // this.router.navigate(['/activate-account']);
          // this.userService.saveLocalStorageToken(value.body.token);
          // this.router.navigate(['lobby']);
          this.userService.saveLocalStorageToken(value.access_token);
          this.userService.saveLocalStorageUser(value.user);
          ManageSessionStorage.setListCompareLiquidations([]);
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
      this.formControlEmail.markAsTouched();
      this.formControlPassword.markAsTouched();
      this.formControlName.markAllAsTouched();
      this.formControlLastName.markAllAsTouched();
      this.formControlNit.markAllAsTouched();
      this.formControlCountry.markAllAsTouched();
      this.formControlPhone.markAllAsTouched();
    }
  }

  openDialogTermsAndConditions(event: MouseEvent): void {
    if (!this.checkTermsAndConditions) {
      event.preventDefault();
      const dialogRef = this.matDialog.open(DialogTermsAndConditionsUserComponent, {
        width: window.innerWidth < 500 ? '96vw' : '90vw',
        maxWidth: '96vw',
        height: 'max-content',
        autoFocus:false
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
