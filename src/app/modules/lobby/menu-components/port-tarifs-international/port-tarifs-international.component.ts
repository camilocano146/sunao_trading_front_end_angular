import { Component, OnInit, ViewChild } from '@angular/core';
import { Port_tarif } from 'src/app/models/Port_tarif';
import { PortTarifService } from 'src/app/services/port-tarif/port-tarif.service';
import {MatPaginator} from '@angular/material/paginator';
import {AppComponent} from '../../../../app.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogImportPortTarifsComponent} from './dialog-import-port-tarifs/dialog-import-port-tarifs.component';
import {FormControl} from '@angular/forms';
import {DialogExportReportComponent} from "../../../common-components/dialog-export-report/dialog-export-report.component";
import {ReportsEnum} from "../../../../enums/Reports.enum";

@Component({
  selector: 'app-port-tarifs',
  templateUrl: './port-tarifs-international.component.html',
  styleUrls: ['./port-tarifs-international.component.scss']
})
export class PortTarifsComponent implements OnInit {

  preload = false;
  list: Port_tarif[];
  pageSizeOptions = AppComponent.pageSizeOptions;
  resultsLength = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns: string[] = [
    'index',
    'location_origin',
    'location_destination',
    'provider',
    'transist_days',
    'validity',
    'cost',
    'return_cost'
  ];
  formControlFilter: FormControl = new FormControl('');
  private timer: number;

  constructor(
    private portTarifService: PortTarifService,
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
      this.portTarifService.getPortTarifsInternational(page, limit, this.formControlFilter.value).subscribe(res => {
        this.list = res.results;
        this.resultsLength = res.count;
        this.preload = false;
      });
    }, AppComponent.timeMillisDelayFilter);
  }

  openDialogImportData(): void {
    const dialogRef = this.matDialog.open(DialogImportPortTarifsComponent, {
      width: '100vw',
      maxWidth: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadTable();
    });
  }

  exportDate(): void {
    const dialogRef = this.matDialog.open(DialogExportReportComponent, {
      width: '600px',
      maxWidth: '96vw',
      height: 'max-content',
      maxHeight: '96vh',
      backdropClass: 'backdrop-dark',
      panelClass: 'div-without-padding',
      data: ReportsEnum.INTERNATION_TARIFF
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
