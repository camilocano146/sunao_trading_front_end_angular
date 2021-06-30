import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AppComponent } from '../../../../app.component';
import { MatDialog } from '@angular/material/dialog';
import { PackageService } from 'src/app/services/package/package.service';
import { DialogPackageCreateEditComponent } from './dialog-package-create-edit/dialog-package-create-edit.component';
import { Package } from 'src/app/models/Package';

export interface DataDialogPackage {
  dataEdit: Package;
}

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {

  preload:boolean=false;
  list:Package[];
  pageSizeOptions = AppComponent.pageSizeOptions;
  resultsLength:number=0;
  @ViewChild(MatPaginator) paginator: MatPaginator;  

  public displayedColumns: string[] = [
    'id',
    "name",
    "time",
    "cost",
    "actions"
  ];
  constructor(
    private packageService:PackageService ,
    private matDialog: MatDialog,
  ) {
    this.loadTable();
   }

  ngOnInit(): void {
  }

  loadTable(){
    this.preload = true;
    this.list = undefined;
    const limit = this.paginator?.pageSize ? this.paginator.pageSize : this.pageSizeOptions[0];
    const page = this.paginator?.pageIndex ? this.paginator.pageIndex*limit : 0;
    this.packageService.getListPackages(page, limit).subscribe(res=>{
      this.list=res.results;
      this.resultsLength = res.count;
      this.preload=false;
    })

  }
  

  openDialogCreate(): void {
    const dialogRef = this.matDialog.open(DialogPackageCreateEditComponent, {
      width: '100vw',
      maxWidth: '400px',
      data: {
        
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadTable();
    });
  }

  openDialogEdit(body: Package): void {
    const dialogRef = this.matDialog.open(DialogPackageCreateEditComponent, {
      width: '100vw',
      maxWidth: '400px',
      data: {
        dataEdit: body
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadTable();
    });
  }

}
