import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {SignInComponent} from './sign-in/sign-in.component';
import {RegisterComponent} from './register/register.component';
import {AuthComponent} from './auth.component';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ActivateAccountComponent} from './activate-account/activate-account.component';
import {RequestCodeComponent} from './request-code/request-code.component';
import {RecoverPasswordComponent} from './recover-pssword/recover-password.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {MatSelectModule} from '@angular/material/select';
import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {DialogTermsAndConditionsUserComponent} from './dialog-terms-and-conditions-user/dialog-terms-and-conditions-user.component';
import { DialogRegisterQuizComponent } from './register/dialog-register-quiz/dialog-register-quiz.component';

@NgModule({
  declarations: [
    SignInComponent,
    RegisterComponent,
    AuthComponent,
    ActivateAccountComponent,
    RequestCodeComponent,
    RecoverPasswordComponent,
    ChangePasswordComponent,
    DialogTermsAndConditionsUserComponent,
    DialogRegisterQuizComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    // HomeRoutingModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  exports: [
    ActivateAccountComponent
  ],
  providers: []
})
export class AuthModule { }
