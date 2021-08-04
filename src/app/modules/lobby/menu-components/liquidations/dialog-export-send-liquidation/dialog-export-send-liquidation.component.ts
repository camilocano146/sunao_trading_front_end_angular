import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ExportSendLiquidation} from '../../../../../enums/ExportSendLiquidation';
import {ExportSendFormatOption} from '../../../../../enums/ExportSendFormatOption';
import {FormControl, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {LiquidationService} from '../../../../../services/liquidation/liquidation.service';
import {NotifyService} from '../../../../../services/notify/notify.service';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-dialog-resume',
  templateUrl: './dialog-export-send-liquidation.component.html',
  styleUrls: ['./dialog-export-send-liquidation.component.scss']
})
export class DialogExportSendLiquidationComponent implements OnInit {
  exportSendLiquidation = ExportSendLiquidation;
  exportSendFormatOption = ExportSendFormatOption;
  optionSelected: number;
  formControlEmail: FormControl = new FormControl('',
    [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(40)]
  );
  preload: boolean;

  constructor(
    public matDialogRef: MatDialogRef<DialogExportSendLiquidationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private translate: TranslateService,
    private liquidationService: LiquidationService,
    private notifyService: NotifyService
  ) { }

  ngOnInit(): void {
  }

  /**
   * Mensajes de error campo usuario
   */
  getErrorMessageUser(): string {
    return this.formControlEmail.hasError('required')
      ? this.translate.instant('fields.required')
      : this.formControlEmail.hasError('email')
        ? this.translate.instant('fields.invalid_email')
        : this.formControlEmail.hasError('minlength')
          ? this.translate.instant('fields.min_5')
          : this.formControlEmail.hasError('maxlength')
            ? this.translate.instant('fields.max_40')
            : '';
  }

  exportOrSend(): void {
    if(this.optionSelected != null && this.data.type === ExportSendLiquidation.EXPORT){
      this.preload = true;
      if (this.optionSelected==0){
        this.liquidationService.export_liquidation_pdf(this.data.id_liquidation).subscribe(res => {
          this.notifyService.showSuccess('Documento Generado');
          FileSaver.saveAs(res, 'liquidacion_'+this.data.id_liquidation + '.pdf');
          this.preload=false;
          this.matDialogRef.close('created');

        }, error => {
          this.notifyService.showError('', 'No fué posible realizar la operación, por favor intente nuevamente.');
          this.preload=false;
        });
      }else if (this.optionSelected==1){
        this.liquidationService.export_liquidation_excel(this.data.id_liquidation).subscribe(res => {
          this.notifyService.showSuccess('Documento Generado');
          FileSaver.saveAs(res, 'liquidacion_'+this.data.id_liquidation+ '.xls');
          this.preload=false;
          this.matDialogRef.close('created');
        }, error => {
          this.notifyService.showError('', 'No fué posible realizar la operación, por favor intente nuevamente.');
          this.preload=false;
        });
      }
    }
    else if(this.optionSelected != null && this.data.type === ExportSendLiquidation.SEND && this.formControlEmail.valid){
      this.preload = true;
      if (this.optionSelected==0){
        this.liquidationService.send_liquidation_pdf(this.data.id_liquidation, this.formControlEmail.value).subscribe(res => {
          this.preload=false;
          this.notifyService.showSuccess('Operacion Exitosa');
          this.matDialogRef.close('created');
        }, error => {
          this.notifyService.showError('', 'No fué posible realizar la operación, por favor intente nuevamente.');
          this.preload=false;
        });
      }else if (this.optionSelected==1){
        this.liquidationService.send_liquidation_excel(this.data.id_liquidation, this.formControlEmail.value).subscribe(res => {
          this.notifyService.showSuccess('Operacion Exitosa');
          this.preload=false;
          this.matDialogRef.close('created');
        }, error => {
          this.notifyService.showError('', 'No fué posible realizar la operación, por favor intente nuevamente.');
          this.preload=false;
        });
      }
    }else {
      this.formControlEmail.markAsTouched();
    }

  }
}
