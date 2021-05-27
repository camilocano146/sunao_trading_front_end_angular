import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ImportComponent} from './import.component';
import {CostsComponent} from './costs/costs.component';

const routes: Routes = [
  {
    path: '', component: ImportComponent,
    children: [
      {path: '', component: CostsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportRoutingModule { }
