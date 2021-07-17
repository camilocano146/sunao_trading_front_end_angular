import {Component, OnInit, ViewChild} from '@angular/core';
import {Location} from '../../../../models/Location';
import {AppComponent} from '../../../../app.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {TranslateService} from '@ngx-translate/core';
import {NotifyService} from '../../../../services/notify/notify.service';
import {LocationService} from '../../../../services/location/location.service';
import {MatDialog} from '@angular/material/dialog';
import {LiquidationService} from '../../../../services/liquidation/liquidation.service';
import {FormControl, Validators} from '@angular/forms';
import {IncotermType, Liquidation} from '../../../../models/Liquidation';
import {ManageSessionStorage} from '../../../../utils/ManageSessionStorage';
import {Router} from '@angular/router';
import {ProductsService} from "../../../../services/products/products.service";

@Component({
  selector: 'app-liquidation',
  templateUrl: './liquidations.component.html',
  styleUrls: ['./liquidations.component.scss']
})
export class LiquidationsComponent implements OnInit {
  preload: boolean;
  list: Location[];
  public displayedColumns: string[] = [
    'id',
    'product',
    'origin',
    'destination',
    'incoterm',
    'date',
    'actions',
  ];
  pageSizeOptions = AppComponent.pageSizeOptions;
  resultsLength: number;
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  listLocations: Location[];
  formControlReference: FormControl = new FormControl('');
  formControlOrigin: FormControl = new FormControl('');
  formControlDestination: FormControl = new FormControl('');
  formControlProduct: FormControl = new FormControl('');
  formControlDate: FormControl = new FormControl('');
  filterSelectedValue: any;
  values: any[] = ['CFR', 'CIF', 'DDP'];
  private timer: number;

  constructor(
    private translate: TranslateService,
    private notifyService: NotifyService,
    private liquidationService: LiquidationService,
    private matDialog: MatDialog,
    private router: Router,
  ) {
    this.loadTable();
  }

  ngOnInit(): void {
  }

  openDialogCreate(): void {

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
      if (this.formControlDate.value) {
        const date = new Date(this.formControlDate.value);
      }
      let textRegex = '';
      if (this.formControlReference.value) {
        textRegex += '&reference=' + this.formControlReference.value;
      }
      if (this.formControlOrigin.value) {
        textRegex += '&location_origin=' + this.formControlOrigin.value;
      }
      if (this.formControlDestination.value) {
        textRegex += '&location_destination=' + this.formControlDestination.value;
      }
      if (this.formControlProduct.value) {
        textRegex += '&incoterm=' + this.formControlProduct.value;
      }
      if (this.filterSelectedValue) {
        textRegex += '&incoterm=' + this.filterSelectedValue;
      }
      if (this.formControlDate.value) {
        const date = new Date(this.formControlDate.value);
        textRegex += '&date=' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate());
      }
      this.liquidationService.getAll(page, limit, textRegex).subscribe(
        value => {
          this.preload = false;
          this.list = value.results;
          this.resultsLength = value.count;
        }, error => {
          this.preload = false;
          this.notifyService.showErrorSnapshotLong(this.translate.instant('errors.connection_error'));
        }
      );
    }, AppComponent.timeMillisDelayFilter);
  }

  changeOriginAutocomplete(): void {

  }

  onSelectOptionOrigin(option: any): void {

  }

  reuse(liquidation: Liquidation): void {
    // ManageSessionStorage.setLiquidationReuse(liquidation);
    this.router.navigate(['import'], {queryParams: {id_liquidation: liquidation.id}});
  }

  goToSeeDetails(row: Liquidation): void {
    if (row.status === 'PENDIENT') {
      this.notifyService.showErrorLong('', 'Aún no tiene un plan activo, debe realizar la comprar de uno.');
      this.router.navigate(['import/plans']);
    } else {
      this.router.navigate([`lobby/liquidations-detail/${row.id}`]);
    }
  }
}
