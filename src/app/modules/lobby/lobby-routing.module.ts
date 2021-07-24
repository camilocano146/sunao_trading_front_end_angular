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
import { CurrenciesComponent } from './menu-components/currencies/currencies.component';
import { PortChargeComponent } from './menu-components/port-charge/port-charge.component';
import { ContainersTypeComponent } from './menu-components/containers-type/containers-type.component';
import {GuardRoleGuard} from "../../guard/guard-role-admin/guard-role.guard";

const routes: Routes = [
  {
    path: '', component: LobbyComponent,
    children: [
      {path: '', component: LiquidationsComponent},
      {path: 'liquidations-detail/:idLiquidation', component: LiquidationDetailsComponent},
      {path: 'transactions', component: TransactionsComponent},
      {path: 'locations', component: CountriesComponent, canActivate: [GuardRoleGuard] },
      {path: 'locations/cities/:idCountry', component: CitiesComponent, canActivate: [GuardRoleGuard] },
      {path: 'providers', component: InternationalProvidersComponent, canActivate: [GuardRoleGuard] },
      {path: 'my-plan', component: MyPlanComponent },
      {path: 'profile', component: ProfileComponent },
      {path: 'port-tarifs', component: PortTarifsComponent, canActivate: [GuardRoleGuard] },
      {path: 'products', component: ProductsComponent, canActivate: [GuardRoleGuard] },
      {path: 'users', component: UsersComponent, canActivate: [GuardRoleGuard] },
      {path: 'ports', component: PortsComponent, canActivate: [GuardRoleGuard] },
      {path: 'chapters', component: ChaptersComponent, canActivate: [GuardRoleGuard] },
      {path: 'port-tarifs-national', component: PortTarifsNationalComponent, canActivate: [GuardRoleGuard] },
      {path: 'packages', component: PackagesComponent, canActivate: [GuardRoleGuard] },
      {path: 'coupons', component: CouponsComponent, canActivate: [GuardRoleGuard] },
      {path: 'national-providers', component: NationalProvidersComponent, canActivate: [GuardRoleGuard] },
      {path: 'currencies', component: CurrenciesComponent, canActivate: [GuardRoleGuard] },
      {path: 'port_charges', component: PortChargeComponent, canActivate: [GuardRoleGuard] },
      {path: 'containers', component: ContainersTypeComponent, canActivate: [GuardRoleGuard] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LobbyRoutingModule {
}
