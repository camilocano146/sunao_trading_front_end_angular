import { Component, OnInit } from '@angular/core';
import {User} from '../../../../models/User';
import {ManageLocalStorage} from '../../../../utils/ManageLocalStorage';
import {UserService} from '../../../../services/user/user.service';
import {Router} from "@angular/router";
import {DialogCountryCreateEditComponent} from "../../menu-components/countries/dialog-country-create-edit/dialog-country-create-edit.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogChangeEmailComponent} from "./dialog-change-email/dialog-change-email.component";
import {DialogChangePasswordComponent} from "./dialog-change-password/dialog-change-password.component";
import {DialogChangeNameDocumentComponent} from "./dialog-change-name-document/dialog-change-name-document.component";
import { DialogVerifyAccountComponent } from './dialog-verify-account/dialog-verify-account.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  preload: boolean;

  constructor(
    private userService: UserService,
    private router: Router,
    private matDialog: MatDialog
  ) {
    this.user = ManageLocalStorage.getUser();

    this.preload = true;
    this.userService.getUser().subscribe(res => {
      this.user = res;
      this.preload = false;
    }, error => {
      this.preload = false;
    });
  }

  ngOnInit(): void {
  }

  verifyAccount(): void {
    if (!this.user.is_active) {
      //window.open('/#/activate-account');
      // this.router.navigate(['']);

      const dialogRef = this.matDialog.open(DialogVerifyAccountComponent, {
        width: '400px',
        maxWidth: '96vw',
        backdropClass: 'backdrop-dark',
        panelClass: 'div-without-padding',
      });
    }
  }

  openDialogChangeEmail(): void {
    const dialogRef = this.matDialog.open(DialogChangeEmailComponent, {
      width: '400px',
      maxWidth: '96vw',
      backdropClass: 'backdrop-dark',
      panelClass: 'div-without-padding',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user.email = result;
      }
    });
  }

  openDialogChangePassword(): void {
    const dialogRef = this.matDialog.open(DialogChangePasswordComponent, {
      width: '400px',
      maxWidth: '96vw',
      backdropClass: 'backdrop-dark',
      panelClass: 'div-without-padding',
    });
  }

  openDialogChangeNameDocument(): void {
    const dialogRef = this.matDialog.open(DialogChangeNameDocumentComponent, {
      width: '400px',
      maxWidth: '96vw',
      backdropClass: 'backdrop-dark',
      panelClass: 'div-without-padding',
      data: this.user
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user.first_name = result?.first_name;
        this.user.last_name = result?.last_name;
        this.user.document = result?.document;
        this.user.digit_check = result?.digit_check;
      }
    });
  }
}
