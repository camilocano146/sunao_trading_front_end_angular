import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {FormControl, Validators} from '@angular/forms';
import {NotifyService} from '../../../../../services/notify/notify.service';
import {HttpErrorResponse} from '@angular/common/http';

import {DataDialogCoupon} from '../coupons.component';

import { Coupon } from 'src/app/models/Coupon';
import { CouponsService } from 'src/app/services/cuopons/coupons.service';

@Component({
  selector: 'app-dialog-coupons-create-edit',
  templateUrl: './dialog-coupons-create-edit.component.html',
  styleUrls: ['./dialog-coupons-create-edit.component.scss']
})
export class DialogCouponsCreateEditComponent implements OnInit {

  public preload: boolean;
  public preloadSave: boolean;
  public formControlDiscountPercent: FormControl = new FormControl(
    null, [Validators.required, Validators.min(1), Validators.max(100)]
  );

  constructor(
    private couponsService: CouponsService,
    public dialogRef: MatDialogRef<DialogCouponsCreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialogCoupon,
    private translate: TranslateService,
    private notifyService: NotifyService,
  ) {
    if (data.dataEdit){
      this.formControlDiscountPercent.setValue(data.dataEdit.discount_percent);
    }
  }

  ngOnInit(): void {
  }

  saveOrEdit(): void {
    if (this.formControlDiscountPercent.valid ) {
      this.preloadSave = true;
      const body: Coupon = {
        discount_percent: this.formControlDiscountPercent.value,

      };
      let observable;

      if (this.data.dataEdit) {
        observable = this.couponsService.edit(this.data.dataEdit.id, body);
      } else {
        observable = this.couponsService.register(body);
      }
      observable.subscribe(res => {
        this.preloadSave = false;
        this.notifyService.showSuccessCreateOrEdit(!!this.data.dataEdit);
        this.dialogRef.close('created');
      }, (error: HttpErrorResponse) => {
        this.preloadSave = false;
      });
    } else {
      this.formControlDiscountPercent.markAsTouched();
    }
  }

  validate_data($event): void {
    if ($event.path[0].value > 100){
      this.formControlDiscountPercent.setValue(100);
    }
  }

  getErrorDiscount(): string {
    return 'Debe ingresar un número válido entre 1 y 100';
  }
}
