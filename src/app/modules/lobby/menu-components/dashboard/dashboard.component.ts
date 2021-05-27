import { Component, OnInit } from '@angular/core';
import {NotifyService} from '../../../../services/notify/notify.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  list: any;
  preload: boolean;

  constructor(
    private translate: TranslateService,
    private notifyService: NotifyService,
  ) {
    this.loadInfo();
  }

  ngOnInit(): void {
  }

  loadInfo(): void {
    this.preload = true;
  }
}
