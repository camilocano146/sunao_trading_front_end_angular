import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-terms-and-conditions-user.component.html',
  styleUrls: ['./dialog-terms-and-conditions-user.component.scss']
})
export class DialogTermsAndConditionsUserComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogTermsAndConditionsUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) { }

  ngOnInit(): void {
  }
}
