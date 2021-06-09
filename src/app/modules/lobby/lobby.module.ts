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
import {LiquidationDetailsComponent} from './menu-components/liquidations/liquidation-details/liquidation-details.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { ProfileComponent } from './settings-components/profile/profile.component';
import { MyPlanComponent } from './settings-components/my-plan/my-plan.component';
import { MyTransactionsComponent } from './settings-components/my-transactions/my-transactions.component';
import { LocationsComponent } from './menu-components/locations/locations.component';
import {DialogLocationCreateEditComponent} from './menu-components/locations/dialog-user-create/dialog-location-create-edit.component';
import { LiquidationsComponent } from './menu-components/liquidations/liquidations.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  declarations: [
    LobbyComponent,
    LiquidationDetailsComponent,
    ProfileComponent,
    MyPlanComponent,
    MyTransactionsComponent,
    LocationsComponent,
    DialogLocationCreateEditComponent,
    LiquidationsComponent,
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
