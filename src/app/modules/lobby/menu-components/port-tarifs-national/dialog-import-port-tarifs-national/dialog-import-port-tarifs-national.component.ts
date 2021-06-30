import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {FormControl, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import { PortTarifService } from 'src/app/services/port-tarif/port-tarif.service';
import { NotifyService } from 'src/app/services/notify/notify.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-import-port-tarifs-national',
  templateUrl: './dialog-import-port-tarifs-national.component.html',
  styleUrls: ['./dialog-import-port-tarifs-national.component.scss']
})
export class DialogImportPortTarifsNationalComponent implements OnInit {

  public preload: boolean;
  public preloadSave: boolean;
  public formControlFile: FormControl = new FormControl(
    null, [Validators.required]
  );
  constructor(
    public dialogRef: MatDialogRef<DialogImportPortTarifsNationalComponent>,
    private translate: TranslateService,
    private portTarifService:PortTarifService,
    private notifyService: NotifyService,
  ) { }

  ngOnInit(): void {
  }

  save(): void {
    if (this.formControlFile.valid) {
      console.log("save")
      this.preloadSave = true;
      this.portTarifService.importFilePortTarifsNational(this.formControlFile.value).subscribe(res => {
        this.preloadSave = false;
        this.notifyService.showSuccessCreateOrEdit(null);
        this.dialogRef.close('created');
      }, (error: HttpErrorResponse) => {
        console.log(error)
        
        if(error.status ==400){
          const errors = error.error?.detail;

          let messageError= "";
          
          for (const e of errors) {
            messageError += `<h3> Fila: ${e.row} Column: ${e.column}</h3>  ${e.detail} <br><br> `;
          }

          Swal.fire(
            'Errores en el archivo',
            messageError,
            'error'
          )
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
