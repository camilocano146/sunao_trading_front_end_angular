import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './menu-components/dashboard/dashboard.component';
import {LobbyComponent} from './lobby.component';
import {ProfileComponent} from './settings-comonents/profile/profile.component';
import {MyTransactionsComponent} from './settings-comonents/my-transactions/my-transactions.component';
import {MyPlanComponent} from './settings-comonents/my-plan/my-plan.component';

const routes: Routes = [
  {
    path: '', component: LobbyComponent,
    children: [
      {path: '', component: DashboardComponent},
      {path: 'my-transactions', component: MyTransactionsComponent},
      {path: 'my-plan', component: MyPlanComponent},
      {path: 'profile', component: ProfileComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LobbyRoutingModule {
}
