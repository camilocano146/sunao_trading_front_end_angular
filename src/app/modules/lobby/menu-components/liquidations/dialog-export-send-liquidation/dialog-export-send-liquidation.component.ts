import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ExportSendLiquidation} from '../../../../../enums/ExportSendLiquidation';
import {ExportSendFormatOption} from '../../../../../enums/ExportSendFormatOption';
import {FormControl, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {LiquidationService} from '../../../../../services/liquidation/liquidation.service';
import {NotifyService} from '../../../../../services/notify/notify.service';

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
    @Inject(MAT_DIALOG_DATA) public data: ExportSendLiquidation,
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
    if (this.optionSelected != null && (this.data === ExportSendLiquidation.EXPORT || this.formControlEmail.valid)) {
      this.preload = true;
      // this.liquidationService.liquidate().subscribe(res => {
      //
      // }, error => {
      //   this.notifyService.showError('', 'No fué posible realizar la operación, por favor intente nuevamente.');
      // });
    } else {
      this.formControlEmail.markAsTouched();
    }
  }
}
