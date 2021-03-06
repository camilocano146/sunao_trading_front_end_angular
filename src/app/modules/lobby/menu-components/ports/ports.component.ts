import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AppComponent } from '../../../../app.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogPortCreateEditComponent } from './dialog-port-create-edit/dialog-port-create-edit.component';
import { Port } from 'src/app/models/Port';
import { PortsService } from 'src/app/services/ports/ports.service';
import {FormControl} from "@angular/forms";

export interface DataDialogPort {
  dataEdit: Port;
}

@Component({
  selector: 'app-ports',
  templateUrl: './ports.component.html',
  styleUrls: ['./ports.component.scss']
})
export class PortsComponent implements OnInit {

  preload = false;
  list: Port[];
  pageSizeOptions = AppComponent.pageSizeOptions;
  resultsLength = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns: string[] = [
    'id',
    'name',
    'latitud',
    'longitud',
    'city',
    'actions'
  ];
  formControlFilter: FormControl = new FormControl('');
  private timer: number;

  constructor(
    private portsService: PortsService ,
    private matDialog: MatDialog,
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
      this.portsService.getListPorts(page, limit, this.formControlFilter.value).subscribe(res => {
        this.list = res.results;
        this.resultsLength = res.count;
        this.preload = false;
      });
    }, AppComponent.timeMillisDelayFilter);
  }

  openDialogCreate(): void {
    const dialogRef = this.matDialog.open(DialogPortCreateEditComponent, {
      width: '100vw',
      maxWidth: '400px',
      data: {
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadTable();
    });
  }

  openDialogEdit(port: Port): void {
    const dialogRef = this.matDialog.open(DialogPortCreateEditComponent, {
      width: '100vw',
      maxWidth: '400px',
      data: {
        dataEdit: port
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadTable();
    });
  }

}
