import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AppComponent } from '../../../../app.component';
import { MatDialog } from '@angular/material/dialog';
import { PackageService } from 'src/app/services/package/package.service';
import { DialogPackageCreateEditComponent } from './dialog-package-create-edit/dialog-package-create-edit.component';
import { Package } from 'src/app/models/Package';
import {FormControl} from "@angular/forms";

export interface DataDialogPackage {
  dataEdit: Package;
}

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {

  preload = false;
  list: Package[];
  pageSizeOptions = AppComponent.pageSizeOptions;
  resultsLength = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns: string[] = [
    'id',
    'name',
    'time',
    'cost',
    'liquidations',
    'actions'
  ];
  formControlFilter: FormControl = new FormControl('');
  private timer: number;

  constructor(
    private packageService: PackageService ,
    private matDialog: MatDialog,
  ) {
    this.loadTable();
   }

  ngOnInit(): void {
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
      this.packageService.getListPackages(page, limit, this.formControlFilter.value).subscribe(res => {
        this.list = res.results;
        this.resultsLength = res.count;
        this.preload = false;
      });
    }, AppComponent.timeMillisDelayFilter);
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
