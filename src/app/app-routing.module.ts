import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccessLobbyGuard} from './guard/access-lobby/access-lobby.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/auth/auth.module').then(module => module.AuthModule),
  },
  {
    path: 'lobby',
    canActivate: [AccessLobbyGuard],
    loadChildren: () =>
      import('./modules/lobby/lobby.module').then(module => module.LobbyModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
