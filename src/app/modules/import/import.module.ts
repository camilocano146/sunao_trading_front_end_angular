import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportRoutingModule } from './import-routing.module';
import { ImportComponent } from './import.component';
import { CostsComponent } from './costs/costs.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatOptionModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DialogResumeComponent } from './costs/dialog-resume/dialog-resume.component';
import {DialogHelpComponent} from './costs/dialog-help/dialog-help.component';
import {DialogLoginComponent} from './costs/dialog-login/dialog-login.component';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AgmCoreModule} from '@agm/core';
import {AppModule} from '../../app.module';
import {ReplaceTextPipe} from '../../pipes/replace-text/replace-text.pipe';
import { PlansComponent } from './plans/plans.component';
import {MatCheckboxModule} from "@angular/material/checkbox";


@NgModule({
  declarations: [
    ImportComponent,
    CostsComponent,
    DialogResumeComponent,
    DialogHelpComponent,
    DialogLoginComponent,
    ReplaceTextPipe,
    PlansComponent,
  ],
  imports: [
    CommonModule,
    ImportRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatInputModule,
    MatAutocompleteModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatProgressSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    FormsModule,
    MatCheckboxModule
  ]
})
export class ImportModule { }
