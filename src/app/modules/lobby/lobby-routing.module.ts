import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LobbyComponent} from './lobby.component';

const routes: Routes = [
  {
    path: '', component: LobbyComponent,
    children: [
      {path: '', component: DashboardComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LobbyRoutingModule {
}
