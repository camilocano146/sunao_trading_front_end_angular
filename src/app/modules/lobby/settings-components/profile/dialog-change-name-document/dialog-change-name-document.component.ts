import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import {ConstantsApp} from '../../../../../utils/ConstantsApp';
import {UserService} from '../../../../../services/user/user.service';
import {NotifyService} from '../../../../../services/notify/notify.service';
import {TranslateService} from "@ngx-translate/core";
import {Utilities} from "../../../../../utils/Utilities";

@Component({
  selector: 'app-change-email',
  templateUrl: './dialog-change-name-document.component.html',
  styleUrls: ['./dialog-change-name-document.component.scss']
})
export class DialogChangeNameDocumentComponent implements OnInit {
  formControlFirstName: FormControl = new FormControl('', [Validators.minLength(2), Validators.maxLength(30)]);
  formControlLastName: FormControl = new FormControl('', [Validators.minLength(2), Validators.maxLength(30)]);
  formControlDocument: FormControl = new FormControl('', [Validators.minLength(5), Validators.maxLength(20)]);
  preload: boolean;

  constructor(
    public userService: UserService,
    public notifyService: NotifyService,
    public matDialogRef: MatDialogRef<DialogChangeNameDocumentComponent>,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
  }

  getErrorMessageFirstName(): string {
    return this.formControlFirstName.hasError('required')
      ? 'Este campo es obligatorio'
      : this.formControlFirstName.hasError('minlength')
        ? 'Longitud mínima de 2 cacteres'
        : this.formControlFirstName.hasError('maxlength')
          ? 'Longitud máxima de 30 cacteres'
          : '';
  }

  getErrorMessageLastName(): string {
    return this.formControlLastName.hasError('required')
      ? 'Este campo es obligatorio'
      : this.formControlLastName.hasError('minlength')
        ? 'Longitud mínima de 2 cacteres'
        : this.formControlLastName.hasError('maxlength')
          ? 'Longitud máxima de 30 cacteres'
          : '';
  }

  getErrorMessageDocument(): string {
    return this.formControlLastName.hasError('required')
      ? 'Este campo es obligatorio'
      : this.formControlLastName.hasError('minlength')
        ? 'Longitud mínima de 5 cacteres'
        : this.formControlLastName.hasError('maxlength')
          ? 'Longitud máxima de 20 cacteres'
          : '';
  }

  changeEmail(): void {
    const firstName = this.formControlFirstName.value?.trim();
    const lastName = this.formControlLastName.value?.trim();
    const document = this.formControlDocument.value?.trim();
    if (this.formControlFirstName.valid && this.formControlLastName.valid && this.formControlDocument.valid) {
      this.preload = true;
      const user = {
        first_name: firstName,
        last_name: lastName,
        document,
        digit_check: undefined
      };
      if (user.document) {
        user.digit_check = Utilities.getDigitVerification(document);
      }
      this.userService.updateUser(user).subscribe(res => {
        this.notifyService.showSuccessSnapshot('Perfíl modificado');
        this.matDialogRef.close(res.email);
        this.preload = false;
      }, error => {
        this.notifyService.showErrorSnapshot('No fué posible actualizar el perfil, por favor intente nuevamente');
        this.preload = false;
      });
    } else {
      this.formControlFirstName.markAsTouched();
      this.formControlLastName.markAsTouched();
      this.formControlDocument.markAsTouched();
    }
  }
}
