import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { AppComponent } from 'src/app/app.component';
import { Gravamen } from 'src/app/models/Gravamen';
import { InternationalAgreement } from 'src/app/models/InternationalAgreement';
import { Iva } from 'src/app/models/Iva';
import { SupportDocument } from 'src/app/models/SupportDocument';
import { ProductsService } from 'src/app/services/products/products.service';
import { DataDialogProduct } from '../products.component';

@Component({
  selector: 'app-dialog-product-details',
  templateUrl: './dialog-product-details.component.html',
  styleUrls: ['./dialog-product-details.component.scss']
})
export class DialogProductDetailsComponent implements OnInit {

  // ---- Ivas ------------
  preloadIvas:boolean=false;
  listIvas:Iva[];
  pageSizeOptionsIvas = AppComponent.pageSizeOptions;
  resultsLengthIvas:number=0;
  @ViewChild(MatPaginator) paginatorIvas: MatPaginator;
  public displayedColumnsIvas: string[] = [
    'id',
    "tarif",
    "date"
  ];

  // ---- Support document ------------
  preloadSupportDocument:boolean=false;
  listSupportDocument:SupportDocument[];
  pageSizeOptionsSupportDocument = AppComponent.pageSizeOptions;
  resultsLengthSupportDocument:number=0;
  @ViewChild(MatPaginator) paginatorSupportDocument: MatPaginator;
  public displayedColumnsSupportDocument: string[] = [
    'id',
    "document",
    "entity",
    "electronic",
    "date"
  ];

  // ---- InternationalAgreement ------------
  preloadInternationalAgreement:boolean=false;
  listInternationalAgreement:InternationalAgreement[];
  pageSizeOptionsInternationalAgreement = AppComponent.pageSizeOptions;
  resultsLengthInternationalAgreement:number=0;
  @ViewChild(MatPaginator) paginatorInternationalAgreement: MatPaginator;
  public displayedColumnsInternationalAgreement: string[] = [
    'id',
    "title",
    "gravamen",
    "location",
    "date"
  ];

  // ---- Gravamen ------------
  preloadGravamen:boolean=false;
  listGravamen:Gravamen[];
  pageSizeOptionsGravamen = AppComponent.pageSizeOptions;
  resultsLengthGravamen:number=0;
  @ViewChild(MatPaginator) paginatorGravamen: MatPaginator;
  public displayedColumnsGravamen: string[] = [
    'id',
    "tarif",
    "date"
  ];

  // ---- TradeRegimen ------------
  preloadTradeRegimen:boolean=false;
  listTradeRegimen:Iva[];
  pageSizeOptionsTradeRegimen = AppComponent.pageSizeOptions;
  resultsLengthTradeRegimen:number=0;
  @ViewChild(MatPaginator) paginatorTradeRegimen: MatPaginator;
  public displayedColumnsTradeRegimen: string[] = [
    'id',
    "concept",
    "date"
  ];


  constructor(
    public dialogRef: MatDialogRef<DialogProductDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialogProduct,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.loadTableIvas();
    this.loadTableSupportDocument();
    this.loadTableInternationalAgreement();
    this.loadTableGravamen();
    this.loadTableTradeRegimen();
  }


  loadTableIvas(){
    this.preloadIvas = true;
    this.listIvas = undefined;
    const limit = this.paginatorIvas?.pageSize ? this.paginatorIvas.pageSize : this.pageSizeOptionsIvas[0];
    const page = this.paginatorIvas?.pageIndex ? this.paginatorIvas.pageIndex * limit : 0;
    this.productService.getIvas(this.data.dataEdit.id, page, limit).subscribe(res=>{
      this.listIvas=res.results;
      this.resultsLengthIvas = res.count;
      this.preloadIvas=false;
    })
  }

  loadTableSupportDocument(){
    this.preloadSupportDocument = true;
    this.listSupportDocument = undefined;
    const limit = this.paginatorSupportDocument?.pageSize ? this.paginatorSupportDocument.pageSize : this.pageSizeOptionsSupportDocument[0];
    const page = this.paginatorSupportDocument?.pageIndex ? this.paginatorSupportDocument.pageIndex * limit : 0;
    this.productService.getSupportDocument(this.data.dataEdit.id, page, limit).subscribe(res=>{
      this.listSupportDocument=res.results;
      this.resultsLengthSupportDocument = res.count;
      this.preloadSupportDocument=false;
    })
  }

  loadTableInternationalAgreement(){
    this.preloadInternationalAgreement = true;
    this.listInternationalAgreement = undefined;
    const limit = this.paginatorInternationalAgreement?.pageSize ? this.paginatorInternationalAgreement.pageSize : this.pageSizeOptionsInternationalAgreement[0];
    const page = this.paginatorInternationalAgreement?.pageIndex ? this.paginatorInternationalAgreement.pageIndex * limit : 0;
    this.productService.getInternationalAgreement(this.data.dataEdit.id, page, limit).subscribe(res=>{
      this.listInternationalAgreement=res.results;
      this.resultsLengthInternationalAgreement = res.count;
      this.preloadInternationalAgreement=false;
    })
  }

  loadTableGravamen(){
    this.preloadGravamen = true;
    this.listGravamen = undefined;
    const limit = this.paginatorGravamen?.pageSize ? this.paginatorGravamen.pageSize : this.pageSizeOptionsGravamen[0];
    const page = this.paginatorGravamen?.pageIndex ? this.paginatorGravamen.pageIndex * limit : 0;
    this.productService.getGravaments(this.data.dataEdit.id, page, limit).subscribe(res=>{
      this.listGravamen=res.results;
      this.resultsLengthGravamen = res.count;
      this.preloadGravamen=false;
    })
  }


  loadTableTradeRegimen(){
    this.preloadTradeRegimen = true;
    this.listTradeRegimen = undefined;
    const limit = this.paginatorTradeRegimen?.pageSize ? this.paginatorTradeRegimen.pageSize : this.pageSizeOptionsTradeRegimen[0];
    const page = this.paginatorTradeRegimen?.pageIndex ? this.paginatorTradeRegimen.pageIndex * limit : 0;
    this.productService.getTradeRegimen(this.data.dataEdit.id, page, limit).subscribe(res=>{
      this.listTradeRegimen=res.results;
      this.resultsLengthTradeRegimen = res.count;
      this.preloadTradeRegimen=false;
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
