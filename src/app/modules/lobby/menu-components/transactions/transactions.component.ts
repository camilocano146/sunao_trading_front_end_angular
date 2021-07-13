import { Component, OnInit, ViewChild } from '@angular/core';
import { Port_tarif } from 'src/app/models/Port_tarif';
import { PortTarifService } from 'src/app/services/port-tarif/port-tarif.service';
import {MatPaginator} from '@angular/material/paginator';
import {AppComponent} from '../../../../app.component';
import {MatDialog} from '@angular/material/dialog';
import {TransactionService} from "../../../../services/transactions/transaction.service";

@Component({
  selector: 'app-port-tarifs-national',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  preload = false;
  list: Port_tarif[];
  pageSizeOptions = AppComponent.pageSizeOptions;
  resultsLength = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns: string[] = [
    'index',
    'date',
    'status',
    'value',
    'payment_method',
  ];

  constructor(
    private portTarifService: TransactionService,
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadTable();
  }

  loadTable(): void {
    this.preload = true;
    this.list = undefined;
    const limit = this.paginator?.pageSize ? this.paginator.pageSize : this.pageSizeOptions[0];
    const page = this.paginator?.pageIndex ? this.paginator.pageIndex * limit : 0;
    this.portTarifService.getAll(page, limit).subscribe(res => {
      this.list = res.results;
      this.resultsLength = res.count;
      this.preload = false;
    });
  }
}
