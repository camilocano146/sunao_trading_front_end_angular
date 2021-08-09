import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NotifyService} from '../../../services/notify/notify.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ReportsEnum} from '../../../enums/Reports.enum';
import {FormControl, Validators} from '@angular/forms';
import {Utilities} from '../../../utils/Utilities';
import Swal from 'sweetalert2';
import {LiquidationService} from '../../../services/liquidation/liquidation.service';
import {PortChargeService} from '../../../services/portCharge/port-charge.service';
import {PortTarifService} from '../../../services/port-tarif/port-tarif.service';
import {HttpErrorResponse} from '@angular/common/http';
import * as FileSaver from 'file-saver';
import { TransactionService } from 'src/app/services/transactions/transaction.service';

@Component({
  selector: 'app-export-report',
  templateUrl: './dialog-export-report.component.html',
  styleUrls: ['./dialog-export-report.component.scss']
})
export class DialogExportReportComponent implements OnInit {
  title: string;
  formControlInitDate: FormControl = new FormControl('', [Validators.required]);
  formControlFinishDate: FormControl = new FormControl('', [Validators.required]);
  preloadExport: boolean;

  constructor(
    private router: Router,
    private notifyService: NotifyService,
    private liquidationService: LiquidationService,
    private portChargeService: PortChargeService,
    private portTariffService: PortTarifService,
    private transacctionService: TransactionService,
    public matDialogRef: MatDialogRef<DialogExportReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReportsEnum,
  ) {
    switch (data) {
      case ReportsEnum.LIQUIDATIONS:
        this.title = 'Liquidaciones';
        break;
      case ReportsEnum.NATIONAL_TARIFF:
        this.title = 'Fletes Nacionales';
        break;
      case ReportsEnum.INTERNATION_TARIFF:
        this.title = 'Fletes Internacionales';
        break;
      case ReportsEnum.PORT_CHARGE:
        this.title = 'Gastos portuarios';
        break;
      case ReportsEnum.TRANSACTIONS:
        this.title = 'Transacciones';
        break;
    }
  }

  ngOnInit(): void {
  }

  buildBodyFilter(): any {
    const bodySearch = {};
    if (this.formControlInitDate.valid && this.formControlFinishDate.valid) {
      const dateSince = new Date(this.formControlInitDate.value);
      const dateUntil = new Date(this.formControlFinishDate.value);
      // @ts-ignore
      bodySearch.date1 = this.getFormatDate(dateSince);
      // @ts-ignore
      bodySearch.date2 = this.getFormatDate(dateUntil);
    }
    return bodySearch;
  }

  getFormatDate(date: Date): string {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${date.getFullYear()}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  }

  export(): void {
    if (this.formControlInitDate.valid && this.formControlFinishDate.valid) {
      this.preloadExport = true;
      if (Utilities.isWrongDatesReports(this.formControlInitDate.value, this.formControlFinishDate.value, Swal)) {
        this.preloadExport = false;
        return;
      }
      const body = this.buildBodyFilter();
      let observable;
      switch (this.data) {
        case ReportsEnum.LIQUIDATIONS:
          observable = this.liquidationService.downloadReport(body);
          break;
        case ReportsEnum.NATIONAL_TARIFF:
          observable = this.portTariffService.downloadNationalReport(body);
          break;
        case ReportsEnum.INTERNATION_TARIFF:
          observable = this.portTariffService.downloadInternationalReport(body);
          break;
        case ReportsEnum.PORT_CHARGE:
          observable = this.portChargeService.downloadReport(body);
          break;
        case ReportsEnum.TRANSACTIONS:
          observable = this.transacctionService.downloadReport(body);
          break;
      }
      observable.subscribe(res => {
        this.preloadExport = false;
        this.notifyService.showSuccess('Documento Generado');
        FileSaver.saveAs(res, 'reporte generado el ' + new Date().toLocaleString() + '.xls');
      }, (error: HttpErrorResponse) => {
        this.preloadExport = false;
      });
    } else {
      this.formControlInitDate.markAsTouched();
      this.formControlFinishDate.markAsTouched();
    }
    // this.matDialogRef.close();
  }
}
