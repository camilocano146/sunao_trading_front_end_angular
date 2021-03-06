import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AppComponent } from '../../../../app.component';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products/products.service';
import { DialogProductCreateEditComponent } from './dialog-product-create-edit/dialog-product-create-edit.component';
import { DialogProductDetailsComponent } from './dialog-product-details/dialog-product-details.component';
import {FormControl} from '@angular/forms';

export interface DataDialogProduct {
  dataEdit: Product;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  preload = false;
  list: Product[];
  pageSizeOptions = AppComponent.pageSizeOptions;
  resultsLength = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private timer: number;

  public displayedColumns: string[] = [
    'id',
    'name',
    'code',
    'subcategory',
    'actions'
  ];
  formControlName: FormControl = new FormControl('', []);

  constructor(
    private productService: ProductsService ,
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
      this.productService.getListProducts(page, limit, this.formControlName.value).subscribe(res => {
        this.list = res.results;
        this.resultsLength = res.count;
        this.preload = false;
      });
    }, AppComponent.timeMillisDelayFilter);
  }

  openDialogCreate(): void {
    const dialogRef = this.matDialog.open(DialogProductCreateEditComponent, {
      width: '100vw',
      maxWidth: '400px',
      data: {

      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadTable();
    });
  }

  openDialogEdit(product: Product): void {
    const dialogRef = this.matDialog.open(DialogProductCreateEditComponent, {
      width: '100vw',
      maxWidth: '400px',
      data: {
        dataEdit: product
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadTable();
    });
  }


  openDialogDetails(product: Product){
    const dialogRef = this.matDialog.open(DialogProductDetailsComponent, {
      width: '100vw',
      maxWidth: '1000px',
      data: {
        dataEdit: product
      }
    });


  }

}

