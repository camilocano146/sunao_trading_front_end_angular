import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {FormControl, Validators} from '@angular/forms';
import {LocationService} from '../../../../../services/location/location.service';
import {NotifyService} from '../../../../../services/notify/notify.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Location} from '../../../../../models/Location';
import {UserService} from '../../../../../services/user/user.service';

@Component({
  selector: 'app-dialog-groups-create',
  templateUrl: './dialog-location-create-edit.component.html',
  styleUrls: ['./dialog-location-create-edit.component.scss']
})
export class DialogLocationCreateEditComponent implements OnInit {
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
  public name: FormControl = new FormControl(
    null, [Validators.required, Validators.minLength(5), Validators.maxLength(this.maxLengthName)]
  );
  public lastName: FormControl = new FormControl(
    null, [Validators.required, Validators.minLength(5), Validators.maxLength(this.maxLengthName)]
  );
  public formControlPhone: FormControl = new FormControl('',
    [Validators.required, Validators.minLength(8), Validators.maxLength(25)]
  );
  public formControlRol: FormControl = new FormControl('',
    [Validators.required]
  );
  formControlPassword: FormControl = new FormControl('',
    [Validators.required, Validators.minLength(8), Validators.maxLength(100)]
  );

  constructor(
    private userService: UserService,
    private locationService: LocationService,
    public dialogRef: MatDialogRef<DialogLocationCreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private translate: TranslateService,
    private notifyService: NotifyService,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Guardar el grupo
   */
  save(): void {
    if (this.formControlEmail.value) {
      this.formControlEmail.setValue(this.formControlEmail.value.toString().toLowerCase().trim());
    }
    if (this.formControlEmail.valid && this.name.valid && this.lastName.valid && this.formControlPhone.valid && this.formControlRol.valid && this.formControlPassword.value) {
      this.preloadSave = true;
      const body: Location = {
        name: this.name.value,
      };
      this.locationService.register(body).subscribe(res => {
        this.preloadSave = false;
        this.notifyService.showSuccessSnapshot(this.translate.instant('success.element_created'));
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
      this.name.markAsTouched();
      this.lastName.markAsTouched();
      this.formControlEmail.markAsTouched();
      this.formControlPhone.markAsTouched();
      this.formControlRol.markAsTouched();
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
    return this.name.hasError('required')
      ? this.translate.instant('fields.required')
      : this.name.hasError('minlength')
        ? this.translate.instant('fields.min_5')
        : this.name.hasError('maxlength')
          ? this.translate.instant('fields.max_50')
          : '';
  }

  getErrorMessageLastName(): string {
    return this.lastName.hasError('required')
      ? this.translate.instant('fields.required')
      : this.lastName.hasError('minlength')
        ? this.translate.instant('fields.min_5')
        : this.lastName.hasError('maxlength')
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

  /**
   * Devuelve el mensaje de password incorrecto
   */
  getErrorMessagePassword(): string {
    return this.formControlPassword.hasError('required')
      ? this.translate.instant('fields.required')
      : this.formControlPassword.hasError('minlength')
        ? this.translate.instant('fields.min_8')
        : this.formControlPassword.hasError('maxlength')
          ? this.translate.instant('fields.max_100')
          : '';
  }

  getErrorMessageRol(): void {
    return this.formControlRol.hasError('required')
      ? this.translate.instant('fields.required')
      : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
