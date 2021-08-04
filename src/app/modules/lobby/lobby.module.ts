import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LobbyRoutingModule} from './lobby-routing.module';
import {LobbyComponent} from './lobby.component';
import {TranslateModule} from '@ngx-translate/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {LiquidationDetailsComponent} from './menu-components/liquidations/liquidation-details/liquidation-details.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { ProfileComponent } from './settings-components/profile/profile.component';
import { MyPlanComponent } from './settings-components/my-plan/my-plan.component';
import { MyTransactionsComponent } from './settings-components/my-transactions/my-transactions.component';
import { CountriesComponent } from './menu-components/countries/countries.component';
import {DialogCountryCreateEditComponent} from './menu-components/countries/dialog-country-create-edit/dialog-country-create-edit.component';
import { LiquidationsComponent } from './menu-components/liquidations/liquidations.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DialogProviderCreateEditComponent} from './menu-components/international-providers/dialog-provider-create-edit/dialog-provider-create-edit.component';
import {InternationalProvidersComponent} from './menu-components/international-providers/international-providers.component';
import {DialogCityCreateEditComponent} from './menu-components/cities/dialog-city-create-edit/dialog-city-create-edit.component';
import {CitiesComponent} from './menu-components/cities/cities.component';
import { PortTarifsComponent } from './menu-components/port-tarifs-international/port-tarifs-international.component';
import { DialogImportPortTarifsComponent } from './menu-components/port-tarifs-international/dialog-import-port-tarifs/dialog-import-port-tarifs.component';
import { ProductsComponent } from './menu-components/products/products.component';
import { UsersComponent } from './menu-components/users/users.component';
import { DialogProductCreateEditComponent } from './menu-components/products/dialog-product-create-edit/dialog-product-create-edit.component';
import { PortsComponent } from './menu-components/ports/ports.component';
import { DialogPortCreateEditComponent } from './menu-components/ports/dialog-port-create-edit/dialog-port-create-edit.component';
import { DialogProductDetailsComponent } from './menu-components/products/dialog-product-details/dialog-product-details.component';
import { ChaptersComponent } from './menu-components/chapters/chapters.component';
import { DialogChapterCreateEditComponent } from './menu-components/chapters/dialog-chapter-create-edit/dialog-chapter-create-edit.component';
import { PortTarifsNationalComponent } from './menu-components/port-tarifs-national/port-tarifs-national.component';
import { DialogImportPortTarifsNationalComponent } from './menu-components/port-tarifs-national/dialog-import-port-tarifs-national/dialog-import-port-tarifs-national.component';
import { PackagesComponent } from './menu-components/packages/packages.component';
import { DialogPackageCreateEditComponent } from './menu-components/packages/dialog-package-create-edit/dialog-package-create-edit.component';
import { CouponsComponent } from './menu-components/coupons/coupons.component';
import { DialogCouponsCreateEditComponent } from './menu-components/coupons/dialog-coupons-create-edit/dialog-coupons-create-edit.component';
import { NationalProvidersComponent } from './menu-components/national-providers/national-providers.component';
import { DialogNationalProvidersCreateEditComponent } from './menu-components/national-providers/dialog-national-providers-create-edit/dialog-national-providers-create-edit.component';
import {ImportModule} from '../import/import.module';
import {TransactionsComponent} from './menu-components/transactions/transactions.component';
import { DialogChangeEmailComponent } from './settings-components/profile/dialog-change-email/dialog-change-email.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {DialogChangePasswordComponent} from './settings-components/profile/dialog-change-password/dialog-change-password.component';
import {DialogChangeNameDocumentComponent} from './settings-components/profile/dialog-change-name-document/dialog-change-name-document.component';
import { PortChargeComponent } from './menu-components/port-charge/port-charge.component';
import { CurrenciesComponent } from './menu-components/currencies/currencies.component';
import { ContainersTypeComponent } from './menu-components/containers-type/containers-type.component';
import {DialogExportReportComponent} from "../common-components/dialog-export-report/dialog-export-report.component";
import { DialogImportPortChargesComponent } from './menu-components/port-charge/dialog-import-port-charges/dialog-import-port-charges.component';
import { DialogVerifyAccountComponent } from './settings-components/profile/dialog-verify-account/dialog-verify-account.component';
import {LiquidationComparatorComponent} from './menu-components/liquidations/liquidation-compator/liquidation-comparator.component';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {DialogExportSendLiquidationComponent} from './menu-components/liquidations/dialog-export-send-liquidation/dialog-export-send-liquidation.component';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    LobbyComponent,
    LiquidationDetailsComponent,
    ProfileComponent,
    MyPlanComponent,
    MyTransactionsComponent,
    CountriesComponent,
    DialogCountryCreateEditComponent,
    LiquidationsComponent,
    InternationalProvidersComponent,
    DialogProviderCreateEditComponent,
    CitiesComponent,
    DialogCityCreateEditComponent,
    PortTarifsComponent,
    DialogImportPortTarifsComponent,
    ProductsComponent,
    UsersComponent,
    DialogProductCreateEditComponent,
    PortsComponent,
    DialogPortCreateEditComponent,
    DialogProductDetailsComponent,
    ChaptersComponent,
    DialogChapterCreateEditComponent,
    PortTarifsNationalComponent,
    DialogImportPortTarifsNationalComponent,
    PackagesComponent,
    DialogPackageCreateEditComponent,
    CouponsComponent,
    DialogCouponsCreateEditComponent,
    NationalProvidersComponent,
    DialogNationalProvidersCreateEditComponent,
    TransactionsComponent,
    DialogChangeEmailComponent,
    DialogChangePasswordComponent,
    DialogChangeNameDocumentComponent,
    PortChargeComponent,
    CurrenciesComponent,
    ContainersTypeComponent,
    DialogExportReportComponent,
    DialogImportPortChargesComponent,
    DialogVerifyAccountComponent,
    LiquidationComparatorComponent,
    DialogExportSendLiquidationComponent,
  ],
  imports: [
    CommonModule,
    LobbyRoutingModule,
    TranslateModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatTabsModule,
    ImportModule,
    MatExpansionModule,
    MatIconModule,
    NgxDropzoneModule,
    MatRadioModule
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]
})
// @ts-ignore
export class LobbyModule { }
