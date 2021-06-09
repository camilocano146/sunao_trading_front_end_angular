import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-resume',
  templateUrl: './dialog-resume.component.html',
  styleUrls: ['./dialog-resume.component.scss']
})
export class DialogResumeComponent implements OnInit {

  constructor(
    public matDialogRef: MatDialogRef<DialogResumeComponent>
  ) { }

  ngOnInit(): void {
  }

}
