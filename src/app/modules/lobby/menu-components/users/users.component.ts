import { Component, OnInit, ViewChild } from '@angular/core';


import {MatPaginator} from '@angular/material/paginator';
import {AppComponent} from '../../../../app.component';
import {MatDialog} from '@angular/material/dialog';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/User';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import {FormControl} from '@angular/forms';
import { DialogUserChangeRolesComponent } from './dialog-user-change-roles/dialog-user-change-roles.component';
import { NotifyService } from 'src/app/services/notify/notify.service';
import { DialogUserDetailsComponent } from './dialog-user-details/dialog-user-details.component';
// import {DialogImportPortTarifsComponent} from './dialog-import-port-tarifs/dialog-import-port-tarifs.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  preload = false;
  list: User[];
  pageSizeOptions = AppComponent.pageSizeOptions;
  resultsLength = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns: string[] = [
    'index',
    'name',
    'email',
    'phone',
    'is_active',
    'role',
    'actions'
  ];
  formControlFilter: FormControl = new FormControl('');
  private timer: number;

  constructor(
    private userService: UserService,
    private matDialog: MatDialog,
    private translate: TranslateService,
    public dialog: MatDialog,
    public notifyService:NotifyService
  ) { }

  ngOnInit(): void {
    this.loadTable();
  }


  loadTable(): void {
    if (this.timer) {
      window.clearTimeout(this.timer);
    }
    this.timer = window.setTimeout(() => {
      this.preload = true;
      this.list = undefined;
      const limit = this.paginator?.pageSize ? this.paginator.pageSize : this.pageSizeOptions[0];
      const page = this.paginator?.pageIndex ? this.paginator.pageIndex * limit : 0;
      this.userService.getAll(page, limit, this.formControlFilter.value).subscribe(res => {
        this.list = res.results;
        this.resultsLength = res.count;
        this.preload = false;
      });
    }, AppComponent.timeMillisDelayFilter);
  }


  openDialogImportData(){}

  activateDeactivate(user: any){
    Swal.fire({
      title: user.is_active ? '¿Deseas desactivar el usuario?' : '¿Deseas activar el usuario?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: user.is_active ? 'Desactivar' : 'Activar',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.list = [];
        this.preload = true;
        this.userService.activateDeactivateUser(user).subscribe(res => {
          Swal.fire(user.is_active ? 'Usuario desactivado.' : 'Usuario activado.', '', 'success');
          this.loadTable();
        });
      } else if (result.isDenied) {
      }
    });

  }


  obtainerBetterRange(list: any[]): any {
    let i= 3;
    list.forEach(elemet=>{
      if (elemet.rol.level<i){
        i=elemet.rol.level
      }
    });
    return i;
  }

  openDialogRoles(idUser): void {
    this.userService.getRoles(idUser).subscribe(res => {
      let betterUserSelected = this.obtainerBetterRange(res.body);
      // if (betterUserSelected < 2) {
      //   this.notifyService.showErrorLong('', 'No tienes permisos para editar este usuario.');
      // } else {
        const dialogRef = this.dialog.open(DialogUserChangeRolesComponent, {
          width: "300px",
          data: +idUser
        });

        dialogRef.afterClosed().subscribe(result => {
          this.loadTable();
        });
      // }
    });

  }

  openDetailsUser(idUser){
    const dialogRef = this.dialog.open(DialogUserDetailsComponent, {
      minWidth: '350px',
      maxWidth: '700px',
      width: '700px',
      data: +idUser
    });
  }


}
