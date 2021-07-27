import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { AppComponent } from 'src/app/app.component';
import { CurrencyService } from 'src/app/services/currency/currency.service';
import { PortChargeService } from 'src/app/services/portCharge/port-charge.service';
import {DialogExportReportComponent} from '../../../common-components/dialog-export-report/dialog-export-report.component';
import {ReportsEnum} from '../../../../enums/Reports.enum';
import { DialogImportPortChargesComponent } from './dialog-import-port-charges/dialog-import-port-charges.component';

@Component({
  selector: 'app-port-charge',
  templateUrl: './port-charge.component.html',
  styleUrls: ['./port-charge.component.scss']
})
export class PortChargeComponent implements OnInit {

  preload = false;
  list: any[];
  pageSizeOptions = AppComponent.pageSizeOptions;
  resultsLength:number;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns: string[] = [
    'id',
    'concept',
    'port',
    'container_type',
    'crete_at',
    'value'
  ];
  private timer: number;

  constructor(
    private portChargeService: PortChargeService,
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
      const limit = this.paginator?.pageSize ? this.paginator.pageSize : this.pageSizeOptions[0];
      const page = this.paginator?.pageIndex ? this.paginator.pageIndex * limit : 0;
      this.portChargeService.getListCharges(page, limit).subscribe(res => {
        this.list = res.results;
        console.log(this.list);
        this.resultsLength = res.count;
        this.preload = false;
      });
    }, AppComponent.timeMillisDelayFilter);
  }

  exportDate(): void {
    const dialogRef = this.matDialog.open(DialogExportReportComponent, {
      width: '600px',
      maxWidth: '96vw',
      height: 'max-content',
      maxHeight: '96vh',
      backdropClass: 'backdrop-dark',
      panelClass: 'div-without-padding',
      data: ReportsEnum.PORT_CHARGE
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialogImportData(): void {
    const dialogRef = this.matDialog.open(DialogImportPortChargesComponent, {
      width: '100vw',
      maxWidth: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadTable();
    });
  }
}
