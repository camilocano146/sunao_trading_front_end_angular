import { Component, OnInit } from '@angular/core';
import {PackageService} from '../../../services/package/package.service';
import {Package} from '../../../models/Package';
import {DialogResumeComponent} from "../costs/dialog-resume/dialog-resume.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogCreateTransactionComponent} from "../../common-components/create-transaction/dialog-create-transaction.component";

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
  listPlans: Package[];
  preload: boolean;
  errorGetPlans: boolean;

  constructor(
    private plans: PackageService,
    private matDialog: MatDialog,
  ) {
    this.getAllPlans();
  }

  ngOnInit(): void {
  }

  getAllPlans(): void {
    this.preload = true;
    this.errorGetPlans = false;
    this.plans.getListPackages(0, 10).subscribe(res => {
      this.listPlans = res.results;
      this.preload = false;
    }, error => {
      this.errorGetPlans = true;
    });
  }

  showBuyDialog(plan: Package): void {
    this.matDialog.open(DialogCreateTransactionComponent, {
      width: '800px',
      maxWidth: '96vw',
      height: '500px',
      maxHeight: '96vh',
      backdropClass: 'backdrop-dark',
      panelClass: 'div-without-padding',
      data: plan
    });
  }
}
