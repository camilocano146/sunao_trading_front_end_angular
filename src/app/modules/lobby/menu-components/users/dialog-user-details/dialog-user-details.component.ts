import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dialog-user-details',
  templateUrl: './dialog-user-details.component.html',
  styleUrls: ['./dialog-user-details.component.scss']
})
export class DialogUserDetailsComponent implements OnInit {

  public info: any;
  public preload:boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private userService:UserService,
    private dialogRef:MatDialogRef<DialogUserDetailsComponent>

  ) { 
    this.getInfoUser();
  }
  ngOnInit(): void { 
  }
  getInfoUser(){
    this.preload=true;
    this.userService.get_info_user_by_id(this.data).subscribe(res=>{
      this.info=res.body;
      this.preload=false;
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
