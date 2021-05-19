import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {RegisterComponent} from './register/register.component';
import {AuthComponent} from './auth.component';
import {ActivateAccountComponent} from './activate-account/activate-account.component';
import {RequestCodeComponent} from './request-code/request-code.component';
import {RecoverPasswordComponent} from './recover-pssword/recover-password.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {SessionStartedGuard} from '../../guard/session-started/session-started-guard.service';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        component: SignInComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'activate-account',
        component: ActivateAccountComponent
      },
      {
        path: 'request-code',
        component: RequestCodeComponent
      },
      {
        path: 'recover-password',
        component: RecoverPasswordComponent
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
