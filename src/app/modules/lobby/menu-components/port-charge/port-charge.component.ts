import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { AppComponent } from 'src/app/app.component';
import { CurrencyService } from 'src/app/services/currency/currency.service';
import { PortChargeService } from 'src/app/services/portCharge/port-charge.service';

@Component({
  selector: 'app-port-charge',
  templateUrl: './port-charge.component.html',
  styleUrls: ['./port-charge.component.scss']
})
export class PortChargeComponent implements OnInit {

  preload = false;
  list: any[];
  pageSizeOptions = AppComponent.pageSizeOptions;
  resultsLength = 10;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns: string[] = [
    'id',
    'concept',
    'port',
    'container_type'
  ];
  private timer: number; 
  
  constructor(
    private portChargeService: PortChargeService
  ) { }

  ngOnInit(): void {
    this.loadTable();
  }


  loadTable(): void {
    if (this.timer) {
      window.clearTimeout(this.timer);
    }
    this.timer = window.setTimeout(() => {
      this.preload = true;
      this.list = undefined;
      const limit = this.paginator?.pageSize ? this.paginator.pageSize : this.pageSizeOptions[0];
      const page = this.paginator?.pageIndex ? this.paginator.pageIndex * limit : 0;
      this.portChargeService.getListCharges(0, 10).subscribe(res => {
        this.list = res.results;
        this.resultsLength = res.count;
        this.preload = false;
      });
    }, AppComponent.timeMillisDelayFilter);
  }
}
