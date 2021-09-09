import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dialog-user-change-roles',
  templateUrl: './dialog-user-change-roles.component.html',
  styleUrls: ['./dialog-user-change-roles.component.scss']
})
export class DialogUserChangeRolesComponent implements OnInit {

  //------Preload
  public preloadChange: boolean;
  public preload: boolean;
  //------Error
  public error: boolean;
  public errorMessage: string;
  //------Account
  public user: User;
  //------Roles Avaiables
  public rolesAvaiables: any[];
  //------FormsControl
  public rolFormControl: FormControl;

  public rolesUser: any;

  constructor(
    public dialogRef: MatDialogRef<DialogUserChangeRolesComponent>,
    private userService: UserService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: number) {
    this.preloadChange = false;
    this.preload = true;
    this.rolFormControl = new FormControl(null,Validators.required);
    this.rolesAvaiables = [];
    this.userService.getAllRoles().subscribe(res=>{
      this.rolesAvaiables=res.body.results.filter(r => r.level==='1');;
      this.getRolesUser();
    })
  }

  ngOnInit() {
  }

  getRolesUser(){
    this.preload=true;
    this.userService.getRoles(this.data).subscribe(res => {
      this.preload=false;
      
      let list=res.body;
      let vect:number[]=[]

      for (let i = 0; i < list.length; i++) {
        const element = list[i];
        vect.push(element.rol.id)
      }
      this.rolFormControl.setValue(vect);

    })
  }
  obtainerBetterRange(list: any[]): any {
    let i = +list[0];
    list.forEach(element => {
      if (+element < i) {
        i = +element;
      }
    });
    return i;
  }
  

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(){
    if(this.rolFormControl.valid){
      this.preload=true;
      this.userService.setRoles(this.rolFormControl.value,this.data).subscribe(res=>{
        this.dialogRef.close()
      })
    }
  }
  

}
