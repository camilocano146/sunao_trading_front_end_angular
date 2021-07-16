import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import {ConstantsApp} from '../../../../../utils/ConstantsApp';
import {UserService} from '../../../../../services/user/user.service';
import {NotifyService} from '../../../../../services/notify/notify.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './dialog-change-email.component.html',
  styleUrls: ['./dialog-change-email.component.scss']
})
export class DialogChangeEmailComponent implements OnInit {
  formControlEmail: FormControl = new FormControl('', [Validators.required, Validators.pattern(ConstantsApp.patternEmail)]);
  preload: boolean;

  constructor(
    public userService: UserService,
    public notifyService: NotifyService,
    public matDialogRef: MatDialogRef<DialogChangeEmailComponent>
  ) { }

  ngOnInit(): void {
  }

  getErrorMessageEmail(): string {
    return 'Debe ingresar un correo válido';
  }

  changeEmail(): void {
    this.preload = true;
    const email = this.formControlEmail.value?.trim();
    if (this.formControlEmail.valid) {
      this.userService.updateUserEmail({email}).subscribe(res => {
        console.log(res);
        this.notifyService.showSuccessSnapshot('Email modificado');
        this.matDialogRef.close(res.email);
        this.preload = false;
      }, error => {
        this.notifyService.showErrorSnapshot('No fué posible actualizar el email, por favor intente nuevamente');
        this.preload = false;
      });
    }
  }
}
