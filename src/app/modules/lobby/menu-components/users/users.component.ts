import { Component, OnInit, ViewChild } from '@angular/core';


import {MatPaginator} from '@angular/material/paginator';
import {AppComponent} from '../../../../app.component';
import {MatDialog} from '@angular/material/dialog';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/User';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
// import {DialogImportPortTarifsComponent} from './dialog-import-port-tarifs/dialog-import-port-tarifs.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  
  preload:boolean=false;
  list:User[];
  pageSizeOptions = AppComponent.pageSizeOptions;
  resultsLength:number=0;
  @ViewChild(MatPaginator) paginator: MatPaginator;  

  public displayedColumns: string[] = [
    'index',
    'name',
    'email',
    'phone',
    'is_active',
    'actions'
  ];

  constructor(
    private userService: UserService,
    private matDialog: MatDialog,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.loadTable();
  }


  loadTable(){
    this.preload = true;
    this.list = undefined;
    const limit = this.paginator?.pageSize ? this.paginator.pageSize : this.pageSizeOptions[0];
    const page = this.paginator?.pageIndex ? this.paginator.pageIndex*limit : 0;
    this.userService.getAll(page, limit).subscribe(res=>{
      this.list=res.results;
      this.resultsLength = res.count;
      this.preload=false;
    })

  }


  openDialogImportData(){}

  activateDeactivate(user:any){
    console.log(user )

    Swal.fire({
      title: user.is_active? "¿Deseas desactivar el usuario?":"¿Deseas activar el usuario?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: user.is_active? "Desactivar":"Activar",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.list=[];
        this.preload=true;
        this.userService.activateDeactivateUser(user).subscribe(res=>{
          Swal.fire(user.is_active? "Usuario desactivado.":"Usuario activado.", '', 'success')
          this.loadTable();
        });
      } else if (result.isDenied) {
      }
    })

  }
}
