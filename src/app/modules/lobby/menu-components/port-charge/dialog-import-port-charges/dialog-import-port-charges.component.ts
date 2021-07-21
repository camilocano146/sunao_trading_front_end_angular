import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { NotifyService } from 'src/app/services/notify/notify.service';
import { PortChargeService } from 'src/app/services/portCharge/port-charge.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-import-port-charges',
  templateUrl: './dialog-import-port-charges.component.html',
  styleUrls: ['./dialog-import-port-charges.component.scss']
})
export class DialogImportPortChargesComponent implements OnInit {

  public preload: boolean;
  public preloadSave: boolean;
  public formControlFile: FormControl = new FormControl(
    null, [Validators.required]
  );
  constructor(
    public dialogRef: MatDialogRef<DialogImportPortChargesComponent>,
    private translate: TranslateService,
    private portChargeService: PortChargeService,
    private notifyService: NotifyService,
  ) { }

  ngOnInit(): void {
  }

  save(): void {
    if (this.formControlFile.valid) {
      this.preloadSave = true;
      this.portChargeService.importFilePortCharges(this.formControlFile.value).subscribe(res => {
        this.preloadSave = false;
        this.notifyService.showSuccessCreateOrEdit(null);
        console.log("correcto")
        this.dialogRef.close('created');
      }, (error: HttpErrorResponse) => {
        if (error.status == 400){
          console.log(error)
          const errors = error.error?.detail;

          let messageError = '';

          for (const e of errors) {
            messageError += `<h3> Fila: ${e.row} Column: ${e.column}</h3>  ${e.detail} <br><br> `;
          }

          Swal.fire(
            'Errores en el archivo',
            messageError,
            'error'
          );
          this.dialogRef.close('created');
        }
        this.preloadSave = false;
      });
    }
  }

  onFileSelect(event) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formControlFile.setValue(file);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
