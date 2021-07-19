import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { AppComponent } from 'src/app/app.component';
import { ContainerService } from 'src/app/services/container/container.service';
import { CurrencyService } from 'src/app/services/currency/currency.service';

@Component({
  selector: 'app-containers-type',
  templateUrl: './containers-type.component.html',
  styleUrls: ['./containers-type.component.scss']
})
export class ContainersTypeComponent implements OnInit {

  preload = false;
  list: any[];
  pageSizeOptions = AppComponent.pageSizeOptions;
  resultsLength = 10;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns: string[] = [
    'id',
    'name'
  ];
  private timer: number;
  constructor(
    private containerService:ContainerService
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
      this.containerService.getAll(0, 10).subscribe(res => {
        this.list = res.results;
        this.preload = false;
      });
    }, AppComponent.timeMillisDelayFilter);
  }

}
