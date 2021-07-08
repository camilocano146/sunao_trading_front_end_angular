import { Component, OnInit } from '@angular/core';
import {PackageService} from '../../../services/package/package.service';
import {Package} from '../../../models/Package';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
  listPlans: Package[];

  constructor(
    private plans: PackageService
  ) {
    this.getAllPlans();
  }

  ngOnInit(): void {
  }

  private getAllPlans(): void {
    this.plans.getListPackages(0, 10).subscribe(res => {
      this.listPlans = res.results;
    }, error => {
    });
  }
}
