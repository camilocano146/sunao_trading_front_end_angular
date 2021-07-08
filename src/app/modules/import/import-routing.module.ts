import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ImportComponent} from './import.component';
import {CostsComponent} from './costs/costs.component';
import {PlansComponent} from './plans/plans.component';

const routes: Routes = [
  {
    path: '', component: ImportComponent,
    children: [
      {path: '', component: CostsComponent},
      {path: 'plans', component: PlansComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportRoutingModule { }
