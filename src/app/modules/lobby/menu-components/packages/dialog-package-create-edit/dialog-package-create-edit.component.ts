import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {FormControl, Validators} from '@angular/forms';
import {NotifyService} from '../../../../../services/notify/notify.service';
import {HttpErrorResponse} from '@angular/common/http';

import {DataDialogPackage} from '../packages.component';

import { Package } from 'src/app/models/Package';
import { PackageService } from 'src/app/services/package/package.service';

@Component({
  selector: 'app-dialog-package-create-edit',
  templateUrl: './dialog-package-create-edit.component.html',
  styleUrls: ['./dialog-package-create-edit.component.scss']
})
export class DialogPackageCreateEditComponent implements OnInit {

  public preload: boolean;
  public preloadSave: boolean;
  maxLengthName = 100;
  public files: File[] = [];


  public formControlLiquidationQuantity: FormControl = new FormControl(
    null, [Validators.required, Validators.minLength(3), Validators.maxLength(this.maxLengthName)]
  );

  public formControlTime: FormControl = new FormControl(
    null, [Validators.required,  Validators.maxLength(5)]
  );

  public formControlName: FormControl = new FormControl(
    null, [Validators.required, Validators.minLength(3), Validators.maxLength(this.maxLengthName)]
  );

  public formControlCost: FormControl = new FormControl(
    null, [Validators.required,  Validators.maxLength(5)]
  );

  constructor(
    private packageService: PackageService,
    public dialogRef: MatDialogRef<DialogPackageCreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialogPackage,
    private translate: TranslateService,
    private notifyService: NotifyService,
  ) {
    if (this.data.dataEdit) {
      this.formControlName.setValue(data.dataEdit.name);
      this.formControlCost.setValue(data.dataEdit.cost);
      this.formControlLiquidationQuantity.setValue(data.dataEdit.liquidation_quantity);
      this.formControlTime.setValue(data.dataEdit.time);
    }
   }

  ngOnInit(): void {

  }

  saveOrEdit(): void {
    if (this.formControlName.valid && this.formControlLiquidationQuantity.valid && this.formControlTime.valid && this.formControlCost) {
      this.preloadSave = true;
      const formData = new FormData();
      formData.append('name', this.formControlName.value);
      formData.append('cost', this.formControlCost.value);
      formData.append('liquidation_quantity', this.formControlCost.value);
      formData.append('time', this.formControlTime.value);
      if(this.files.length > 0){
        formData.append('image', this.files[0]);
      }

      // const body: Package = {
      //   name: this.formControlName.value,
      //   cost: this .formControlCost.value,
      //   liquidation_quantity: this.formControlCost.value,
      //   time: this.formControlTime.value
      // };

      
      let observable;

      if (this.data.dataEdit) {
        observable = this.packageService.edit(this.data.dataEdit.id, formData);
      } else {
        observable = this.packageService.register(formData);
      }
      observable.subscribe(res => {
        this.preloadSave = false;
        this.notifyService.showSuccessCreateOrEdit(!!this.data.dataEdit);
        this.dialogRef.close('created');
      }, (error: HttpErrorResponse) => {
        const errors_code = error.error?.code;
        if (errors_code?.toString()?.toUpperCase()?.includes('chapter with this code already exists.'.toUpperCase())) {
          this.notifyService.showErrorSnapshot(this.translate.instant('chapter.errors.code_unique'));
        } else {
          this.notifyService.showErrorSnapshot(this.translate.instant('errors.connection_error'));
        }

        this.preloadSave = false;
      });
    } else {
      this.formControlName.markAsTouched();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getErrorMessageName(): string {
    return this.formControlName.hasError('required')
      ? this.translate.instant('fields.required')
      : this.formControlName.hasError('minlength')
        ? this.translate.instant('fields.min_3')
        : this.formControlName.hasError('maxlength')
          ? this.translate.instant('fields.max_50')
          : '';
  }


  /**
   * Imagenes
   * 
   */
   onSelect(event) {
    this.files = [];
    this.files.push(...event.addedFiles);
    if (this.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(this.files[0]);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const height = img.naturalHeight;
          const width = img.naturalWidth;
          let diference=height-width
          if(Math.abs(diference)<10){

          }else{
            this.files = [];
            this.notifyService.showErrorSnapshot('El alto y ancho de la imagen deben ser iguales.');
          }  
        }
      }
    }
  }
 
  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
