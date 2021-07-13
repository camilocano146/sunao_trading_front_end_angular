import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LiquidationDetailsComponent} from './menu-components/liquidations/liquidation-details/liquidation-details.component';
import {LobbyComponent} from './lobby.component';
import {ProfileComponent} from './settings-components/profile/profile.component';
import {MyPlanComponent} from './settings-components/my-plan/my-plan.component';
import {CountriesComponent} from './menu-components/countries/countries.component';
import {LiquidationsComponent} from './menu-components/liquidations/liquidations.component';
import {InternationalProvidersComponent} from './menu-components/international-providers/international-providers.component';
import {CitiesComponent} from './menu-components/cities/cities.component';
import { PortTarifsComponent } from './menu-components/port-tarifs-international/port-tarifs-international.component';
import { ProductsComponent } from './menu-components/products/products.component';
import { UsersComponent } from './menu-components/users/users.component';
import { PortsComponent } from './menu-components/ports/ports.component';
import { ChaptersComponent } from './menu-components/chapters/chapters.component';
import { PortTarifsNationalComponent } from './menu-components/port-tarifs-national/port-tarifs-national.component';
import { PackagesComponent } from './menu-components/packages/packages.component';
import { CouponsComponent } from './menu-components/coupons/coupons.component';
import { NationalProvidersComponent } from './menu-components/national-providers/national-providers.component';
import {TransactionsComponent} from './menu-components/transactions/transactions.component';

const routes: Routes = [
  {
    path: '', component: LobbyComponent,
    children: [
      {path: '', component: LiquidationsComponent},
      {path: 'liquidations-detail', component: LiquidationDetailsComponent},
      {path: 'transactions', component: TransactionsComponent},
      {path: 'locations', component: CountriesComponent},
      {path: 'locations/cities/:idCountry', component: CitiesComponent},
      {path: 'providers', component: InternationalProvidersComponent},
      {path: 'my-plan', component: MyPlanComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'port-tarifs', component: PortTarifsComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'users', component: UsersComponent},
      {path: 'ports', component: PortsComponent},
      {path: 'chapters', component: ChaptersComponent},
      {path: 'port-tarifs-national', component: PortTarifsNationalComponent},
      {path: 'packages', component: PackagesComponent},
      {path: 'coupons', component: CouponsComponent},
      {path: 'national-providers', component: NationalProvidersComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LobbyRoutingModule {
}
