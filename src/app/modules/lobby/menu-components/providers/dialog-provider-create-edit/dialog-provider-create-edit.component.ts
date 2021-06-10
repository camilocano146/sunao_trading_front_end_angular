import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {FormControl, Validators} from '@angular/forms';
import {LocationService} from '../../../../../services/location/location.service';
import {NotifyService} from '../../../../../services/notify/notify.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Location} from '../../../../../models/Location';
import {UserService} from '../../../../../services/user/user.service';
import {ProviderService} from '../../../../../services/provider/provider.service';
import {Provider} from '../../../../../models/Provider';

@Component({
  selector: 'app-dialog-groups-create',
  templateUrl: './dialog-provider-create-edit.component.html',
  styleUrls: ['./dialog-provider-create-edit.component.scss']
})
export class DialogProviderCreateEditComponent implements OnInit {
  /**
   * Preload create/edit
   */
  public preload: boolean;
  public preloadSave: boolean;
  maxLengthName = 100;
  maxLengthEmail = 40;
  maxLengthPhone = 25;
  public formControlEmail: FormControl = new FormControl('',
    [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(40)]
  );
  public formControlName: FormControl = new FormControl(
    null, [Validators.required, Validators.minLength(5), Validators.maxLength(this.maxLengthName)]
  );
  public formControlAddress: FormControl = new FormControl(
    null, [Validators.required, Validators.minLength(3), Validators.maxLength(this.maxLengthPhone)]
  );
  public formControlPhone: FormControl = new FormControl('',
    [Validators.required, Validators.minLength(8), Validators.maxLength(25)]
  );

  constructor(
    private userService: UserService,
    private providerService: ProviderService,
    public dialogRef: MatDialogRef<DialogProviderCreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public dataEdit: Provider,
    private translate: TranslateService,
    private notifyService: NotifyService,
  ) {
    if (dataEdit) {
      this.formControlName.setValue(dataEdit.name);
      this.formControlEmail.setValue(dataEdit.email);
      this.formControlAddress.setValue(dataEdit.address);
      this.formControlPhone.setValue(dataEdit.phone);
    }
  }

  ngOnInit(): void {
  }

  saveOrEdit(): void {
    if (this.formControlEmail.value) {
      this.formControlEmail.setValue(this.formControlEmail.value.toString().toLowerCase().trim());
    }
    if (this.formControlName.valid && this.formControlEmail.valid && this.formControlAddress.valid && this.formControlPhone.valid) {
      this.preloadSave = true;
      const body: Provider = {
        name: this.formControlName.value,
        email: this.formControlEmail.value.toLowerCase(),
        address: this.formControlAddress.value,
        phone: this.formControlPhone.value,
        status: '1'
      };
      let observable;
      if (this.dataEdit) {
        observable = this.providerService.edit(this.dataEdit.id, body);
      } else {
        observable = this.providerService.register(body);
      }
      observable.subscribe(res => {
        this.preloadSave = false;
        this.notifyService.showSuccessCreateOrEdit(!!this.dataEdit);
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
      this.formControlAddress.markAsTouched();
      this.formControlEmail.markAsTouched();
      this.formControlPhone.markAsTouched();
    }
  }

  getErrorMessageEmail(): string {
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

  /**
   * Mensaje de error nombre
   */
  getErrorMessageName(): string {
    return this.formControlName.hasError('required')
      ? this.translate.instant('fields.required')
      : this.formControlName.hasError('minlength')
        ? this.translate.instant('fields.min_5')
        : this.formControlName.hasError('maxlength')
          ? this.translate.instant('fields.max_50')
          : '';
  }

  getErrorMessageAddress(): string {
    return this.formControlAddress.hasError('required')
      ? this.translate.instant('fields.required')
      : this.formControlAddress.hasError('minlength')
        ? this.translate.instant('fields.min_2')
        : this.formControlAddress.hasError('maxlength')
          ? this.translate.instant('fields.max_50')
          : '';
  }

  getErrorMessagePhone(): string {
    return this.formControlPhone.hasError('required')
      ? this.translate.instant('fields.required')
      : this.formControlPhone.hasError('minlength')
        ? this.translate.instant('fields.min_8')
        : this.formControlPhone.hasError('maxlength')
          ? this.translate.instant('fields.max_25')
          : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private showSuccessMessage(): void {
    if (this.dataEdit) {
      this.notifyService.showSuccessSnapshot(this.translate.instant('success.element_updated'));
    } else {
      this.notifyService.showSuccessSnapshot(this.translate.instant('success.element_created'));
    }
  }
}
