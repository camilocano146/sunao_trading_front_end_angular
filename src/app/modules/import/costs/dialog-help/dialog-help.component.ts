import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-resume',
  templateUrl: './dialog-help.component.html',
  styleUrls: ['./dialog-help.component.scss']
})
export class DialogHelpComponent implements OnInit {

  constructor(
    public matDialogRef: MatDialogRef<DialogHelpComponent>
  ) { }

  ngOnInit(): void {
  }

}
