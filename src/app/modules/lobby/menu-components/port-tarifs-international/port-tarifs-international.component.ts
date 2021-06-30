import { Component, OnInit, ViewChild } from '@angular/core';
import { Port_tarif } from 'src/app/models/Port_tarif';
import { PortTarifService } from 'src/app/services/port-tarif/port-tarif.service';
import {MatPaginator} from '@angular/material/paginator';
import {AppComponent} from '../../../../app.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogImportPortTarifsComponent} from './dialog-import-port-tarifs/dialog-import-port-tarifs.component';

@Component({
  selector: 'app-port-tarifs',
  templateUrl: './port-tarifs-international.component.html',
  styleUrls: ['./port-tarifs-international.component.scss']
})
export class PortTarifsComponent implements OnInit {

  preload:boolean=false;
  list:Port_tarif[];
  pageSizeOptions = AppComponent.pageSizeOptions;
  resultsLength:number=0;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns: string[] = [
    'index',
    'location_origin',
    'location_destination',
    'provider',
    'transist_days',
    'validity',
    'cost'
  ];

  constructor(
    private portTarifService: PortTarifService,
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadTable()
    
  }

  loadTable(){
    this.preload = true;
    this.list = undefined;
    const limit = this.paginator?.pageSize ? this.paginator.pageSize : this.pageSizeOptions[0];
    const page = this.paginator?.pageIndex ? this.paginator.pageIndex*limit : 0;
    this.portTarifService.getPortTarifs(page, limit).subscribe(res=>{
      this.list=res.results;
      this.resultsLength = res.count;
      this.preload=false;
    })

  }


  openDialogImportData(){
    const dialogRef = this.matDialog.open(DialogImportPortTarifsComponent, {
      width: '100vw',
      maxWidth: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadTable();
    });

  }
}
