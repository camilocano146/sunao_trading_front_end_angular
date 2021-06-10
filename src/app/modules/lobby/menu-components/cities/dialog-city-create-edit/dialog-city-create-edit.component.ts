import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {FormControl, Validators} from '@angular/forms';
import {LocationService} from '../../../../../services/location/location.service';
import {NotifyService} from '../../../../../services/notify/notify.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Location} from '../../../../../models/Location';
import {UserService} from '../../../../../services/user/user.service';
import {ConstantsApp} from '../../../../../utils/ConstantsApp';
import {DataDialogCity} from '../cities.component';

@Component({
  selector: 'app-dialog-groups-create',
  templateUrl: './dialog-city-create-edit.component.html',
  styleUrls: ['./dialog-city-create-edit.component.scss']
})
export class DialogCityCreateEditComponent implements OnInit {
  /**
   * Preload create/edit
   */
  public preload: boolean;
  public preloadSave: boolean;
  maxLengthName = 100;
  public formControlName: FormControl = new FormControl(
    null, [Validators.required, Validators.minLength(3), Validators.maxLength(this.maxLengthName)]
  );

  constructor(
    private userService: UserService,
    private locationService: LocationService,
    public dialogRef: MatDialogRef<DialogCityCreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialogCity,
    private translate: TranslateService,
    private notifyService: NotifyService,
  ) {
    if (this.data.dataEdit) {
      this.formControlName.setValue(data.dataEdit.name);
    }
  }

  ngOnInit(): void {
  }

  saveOrEdit(): void {
    if (this.formControlName.valid) {
      this.preloadSave = true;
      const body: Location = {
        name: this.formControlName.value,
        father_location: this.data.idCountry,
        type: ConstantsApp.TYPE_LOCATION_CITY
      };
      let observable;
      if (this.data.dataEdit) {
        observable = this.locationService.edit(this.data.dataEdit.id, body);
      } else {
        observable = this.locationService.register(body);
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

  /**
   * Mensaje de error nombre
   */
  getErrorMessageName(): string {
    return this.formControlName.hasError('required')
      ? this.translate.instant('fields.required')
      : this.formControlName.hasError('minlength')
        ? this.translate.instant('fields.min_3')
        : this.formControlName.hasError('maxlength')
          ? this.translate.instant('fields.max_50')
          : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
