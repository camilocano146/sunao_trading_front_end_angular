import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LiquidationDetailsComponent} from './menu-components/liquidations/liquidation-details/liquidation-details.component';
import {LobbyComponent} from './lobby.component';
import {ProfileComponent} from './settings-components/profile/profile.component';
import {MyPlanComponent} from './settings-components/my-plan/my-plan.component';
import {CountriesComponent} from './menu-components/countries/countries.component';
import {LiquidationsComponent} from './menu-components/liquidations/liquidations.component';
import {ProvidersComponent} from './menu-components/providers/providers.component';
import {CitiesComponent} from './menu-components/cities/cities.component';

const routes: Routes = [
  {
    path: '', component: LobbyComponent,
    children: [
      {path: '', component: LiquidationsComponent},
      {path: 'liquidations-detail', component: LiquidationDetailsComponent},
      {path: 'locations', component: CountriesComponent},
      {path: 'locations/cities/:idCountry', component: CitiesComponent},
      {path: 'providers', component: ProvidersComponent},
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
