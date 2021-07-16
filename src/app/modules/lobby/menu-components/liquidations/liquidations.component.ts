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
import {Liquidation} from '../../../../models/Liquidation';
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
  values: any[] = ['Incoterm'];
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
      this.liquidationService.getAll(page, limit, this.formControlReference.value).subscribe(
        value => {
          this.preload = false;
          this.list = value.results;
          console.log(this.list);
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
    this.router.navigate([`lobby/liquidations-detail/${row.id}`]);
  }
}
