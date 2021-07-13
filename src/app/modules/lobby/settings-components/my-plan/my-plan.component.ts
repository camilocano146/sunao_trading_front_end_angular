import { Component, OnInit } from '@angular/core';
import {PackageService} from '../../../../services/package/package.service';
import {UserActivePackage} from "../../../../models/UserActivePackage";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-plan',
  templateUrl: './my-plan.component.html',
  styleUrls: ['./my-plan.component.scss']
})
export class MyPlanComponent implements OnInit {
  preload: boolean;
  userActivePackage: UserActivePackage;
  isActivePackage: boolean;

  constructor(
    private packageService: PackageService,
    private router: Router,
  ) {
    this.preload = true;
    this.packageService.getLastPackage().subscribe(value => {
      this.userActivePackage = value.data;
      this.isActivePackage = value.is_active_package;
      this.preload = false;
    }, (error: HttpErrorResponse) => {
      this.preload = false;
    });
  }

  ngOnInit(): void {
  }

  goToRenewPackage(): void {
    this.router.navigate(['import/plans']);
  }
}
