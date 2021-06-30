import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {FormControl, Validators} from '@angular/forms';
import {NotifyService} from '../../../../../services/notify/notify.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Product} from '../../../../../models/Product';

import {ConstantsApp} from '../../../../../utils/ConstantsApp';
import {ProductsComponent} from '../products.component';
import {DataDialogProduct} from '../products.component';
import { ProductsService } from 'src/app/services/products/products.service';


@Component({
  selector: 'app-dialog-product-create-edit',
  templateUrl: './dialog-product-create-edit.component.html',
  styleUrls: ['./dialog-product-create-edit.component.scss']
})
export class DialogProductCreateEditComponent implements OnInit {


  public preload: boolean;
  public preloadSave: boolean;
  maxLengthName = 100;
  public formControlName: FormControl = new FormControl(
    null, [Validators.required, Validators.minLength(3), Validators.maxLength(this.maxLengthName)]
  );
  
  public formControlCode: FormControl = new FormControl(
    null, [Validators.required,  Validators.maxLength(this.maxLengthName)]
  );
  public formControlChapterCode: FormControl = new FormControl(
    null, [Validators.required,  Validators.maxLength(this.maxLengthName)]
  );
  
  public formControlDescription: FormControl = new FormControl(
    null, [  Validators.maxLength(this.maxLengthName)]
  );

  constructor(
    private productsService: ProductsService,
    public dialogRef: MatDialogRef<DialogProductCreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialogProduct,
    private translate: TranslateService,
    private notifyService: NotifyService,
  ) {
    if (this.data.dataEdit) {
      this.formControlName.setValue(data.dataEdit.name);
      this.formControlCode.setValue(data.dataEdit.code);
      this.formControlChapterCode.setValue(data.dataEdit.chapter.code);
      this.formControlDescription.setValue(data.dataEdit.description);
    }

  }

  saveOrEdit(): void {
    if (this.formControlName.valid) {
      this.preloadSave = true;
      const body: Product = {
        name: this.formControlName.value,
        code: this.formControlCode.value,
        chapter_code : this.formControlChapterCode.value,
        description : this.formControlDescription.value
      };
      let observable;

      if (this.data.dataEdit) {
        observable = this.productsService.edit(this.data.dataEdit.id, body);
      } else {
        observable = this.productsService.register(body);
      }
      observable.subscribe(res => {
        this.preloadSave = false;
        this.notifyService.showSuccessCreateOrEdit(!!this.data.dataEdit);
        this.dialogRef.close('created');
      }, (error: HttpErrorResponse) => {
        const errors = error.error.body?.mensaje?.errors;
        
        
        if (errors?.name?.message?.toString()?.toUpperCase()?.includes('name must be unique'.toUpperCase())) {
          this.notifyService.showErrorSnapshot(this.translate.instant('errors.unique_name'));
        } else {
          this.notifyService.showErrorSnapshot(this.translate.instant('errors.connection_error'));
        }

        this.preloadSave = false;
      });
    } else {
      this.formControlName.markAsTouched();
    }
  }

  ngOnInit(): void {
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
