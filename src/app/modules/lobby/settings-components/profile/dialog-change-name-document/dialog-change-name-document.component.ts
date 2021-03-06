import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import {ConstantsApp} from '../../../../../utils/ConstantsApp';
import {UserService} from '../../../../../services/user/user.service';
import {NotifyService} from '../../../../../services/notify/notify.service';
import {TranslateService} from "@ngx-translate/core";
import {Utilities} from "../../../../../utils/Utilities";
import {User} from "../../../../../models/User";

@Component({
  selector: 'app-change-email',
  templateUrl: './dialog-change-name-document.component.html',
  styleUrls: ['./dialog-change-name-document.component.scss']
})
export class DialogChangeNameDocumentComponent implements OnInit {
  formControlFirstName: FormControl = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]);
  formControlLastName: FormControl = new FormControl('', [Validators.maxLength(30)]);
  formControlDocument: FormControl = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]);
  formControlCountry: FormControl = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]);
  formControlPhone: FormControl = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]);
  preload: boolean;

  constructor(
    public userService: UserService,
    public notifyService: NotifyService,
    public matDialogRef: MatDialogRef<DialogChangeNameDocumentComponent>,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public user: User,
  ) {
    if (user) {
      this.formControlFirstName.setValue(user.first_name);
      this.formControlLastName.setValue(user.last_name);
      this.formControlDocument.setValue(user.document);
      this.formControlCountry.setValue(user.country);
      this.formControlPhone.setValue(user.phone);
    }
  }

  ngOnInit(): void {
  }

  getErrorMessageFirstName(): string {
    return this.formControlFirstName.hasError('required')
      ? 'Este campo es obligatorio'
      : this.formControlFirstName.hasError('minlength')
        ? 'Longitud m??nima de 2 cacteres'
        : this.formControlFirstName.hasError('maxlength')
          ? 'Longitud m??xima de 30 cacteres'
          : '';
  }

  getErrorMessageLastName(): string {
    return this.formControlLastName.hasError('maxlength')? 'Longitud m??xima de 30 cacteres' : '';
  }

  getErrorMessageDocument(): string {
    return this.formControlDocument.hasError('required')
      ? 'Este campo es obligatorio'
      : this.formControlDocument.hasError('minlength')
        ? 'Longitud m??nima de 5 cacteres'
        : this.formControlDocument.hasError('maxlength')
          ? 'Longitud m??xima de 20 cacteres'
          : '';
  }

  getErrorMessageCountry(): string {
    return this.formControlCountry.hasError('required')
      ? 'Este campo es obligatorio'
      : this.formControlCountry.hasError('minlength')
        ? 'Longitud m??nima de 5 cacteres'
        : this.formControlCountry.hasError('maxlength')
          ? 'Longitud m??xima de 20 cacteres'
          : '';
  }

  getErrorMessagePhone(): string {
    return this.formControlPhone.hasError('required')
      ? 'Este campo es obligatorio'
      : this.formControlPhone.hasError('minlength')
        ? 'Longitud m??nima de 5 cacteres'
        : this.formControlPhone.hasError('maxlength')
          ? 'Longitud m??xima de 20 cacteres'
          : '';
  }

  changeEmail(): void {
    const firstName = this.formControlFirstName.value?.trim();
    const lastName = this.formControlLastName.value?.trim();
    const document = this.formControlDocument.value?.trim();
    const country = this.formControlCountry.value?.trim();
    const phone= this.formControlPhone.value?.trim();
    if (this.formControlFirstName.valid && this.formControlLastName.valid && this.formControlDocument.valid) {
      this.preload = true;
      const user = {
        first_name: firstName,
        last_name: lastName,
        document,
        country:country,
        phone: phone, 
        digit_check: undefined
      };
      if (user.document) {
        user.digit_check = Utilities.getDigitVerification(document) + '';
      }
      this.userService.updateUser(user).subscribe(res => {
        this.notifyService.showSuccessSnapshot('Perf??l modificado');
        this.matDialogRef.close(user);
        this.preload = false;
      }, error => {
        this.notifyService.showErrorSnapshot('No fu?? posible actualizar el perfil, por favor intente nuevamente');
        this.preload = false;
      });
    } else {
      this.formControlFirstName.markAsTouched();
      this.formControlLastName.markAsTouched();
      this.formControlDocument.markAsTouched();
      this.formControlCountry.markAllAsTouched();
      this.formControlPhone.markAllAsTouched();
    }
  }
}
