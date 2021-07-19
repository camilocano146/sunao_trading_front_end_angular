import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { AppComponent } from 'src/app/app.component';
import { CurrencyService } from 'src/app/services/currency/currency.service';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})
export class CurrenciesComponent implements OnInit {
  preload = false;
  list: any[];
  pageSizeOptions = AppComponent.pageSizeOptions;
  resultsLength = 10;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns: string[] = [
    'id',
    'name',
    'acronym'
  ];
  private timer: number;

  constructor(
    private currencyService:CurrencyService,
    private matDialog: MatDialog,
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
      // const limit = this.paginator?.pageSize ? this.paginator.pageSize : this.pageSizeOptions[0];
      // const page = this.paginator?.pageIndex ? this.paginator.pageIndex * limit : 0;
      this.currencyService.getListCurrencies(0, 10).subscribe(res => {
        this.list = res.results;
        this.preload = false;
      });
    }, AppComponent.timeMillisDelayFilter);
  }

}
