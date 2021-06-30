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
      this.formControlTime.setValue(data.dataEdit.time)
    }

   }

  ngOnInit(): void {
    
  }

  saveOrEdit(): void {
    if (this.formControlName.valid && this.formControlLiquidationQuantity.valid && this.formControlTime.valid && this.formControlCost) {
      this.preloadSave = true;
      const body: Package = {
        name: this.formControlName.value,
        cost: this .formControlCost.value,
        liquidation_quantity: this.formControlLiquidationQuantity.value,
        time:this.formControlTime.value
      };
      let observable;

      if (this.data.dataEdit) {
        observable = this.packageService.edit(this.data.dataEdit.id, body);
      } else {
        observable = this.packageService.register(body);
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

}
