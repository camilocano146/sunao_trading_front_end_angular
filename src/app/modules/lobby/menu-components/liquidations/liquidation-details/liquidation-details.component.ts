import { Component, OnInit } from '@angular/core';
import {NotifyService} from '../../../../../services/notify/notify.service';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboards',
  templateUrl: './liquidation-details.component.html',
  styleUrls: ['./liquidation-details.component.scss']
})
export class LiquidationDetailsComponent implements OnInit {
  list: any;
  preload: boolean;

  constructor(
    private translate: TranslateService,
    private notifyService: NotifyService,
    private router: Router
  ) {
    this.loadInfo();
  }

  ngOnInit(): void {
  }

  loadInfo(): void {
    this.preload = true;
  }

  goToLiquidations(): void {
    this.router.navigate(['']);
  }
}
