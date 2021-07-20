import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AppComponent} from '../../../../app.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {TranslateService} from '@ngx-translate/core';
import {NotifyService} from '../../../../services/notify/notify.service';
import {MatDialog} from '@angular/material/dialog';
import {User} from '../../../../models/User';
// import {DialogCountryCreateEditComponent} from './dialog-country-create-edit/dialog-country-create-edit.component';
import {Location} from '../../../../models/Location';
import {Router} from '@angular/router';
import {ManageSessionStorage} from '../../../../utils/ManageSessionStorage';
import { CouponsService } from 'src/app/services/cuopons/coupons.service';
import { DialogCouponsCreateEditComponent } from './dialog-coupons-create-edit/dialog-coupons-create-edit.component';
import { Coupon } from 'src/app/models/Coupon';
import {FormControl} from '@angular/forms';

export interface DataDialogCoupon {
  dataEdit: Coupon;
}
@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit, AfterViewInit {

  preload: boolean;
  list: Coupon[];
  public displayedColumns: string[] = [
    'id',
    'code',
    'discount_percent',
    'created_at',
    'created_by',
    'used_by',
    'actions'
  ];


  pageSizeOptions = AppComponent.pageSizeOptions;
  resultsLength: number;
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  formControlFilter: FormControl = new FormControl('');
  private timer: number;

  constructor(
    private translate: TranslateService,
    private notifyService: NotifyService,
    private cuoponsService: CouponsService,
    private matDialog: MatDialog,
    private router: Router,
  ) {
    this.loadTable();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
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
      this.cuoponsService.getListCoupon(page, limit, this.formControlFilter.value).subscribe(
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

  openDialogCreate(): void {
    const dialogRef = this.matDialog.open(DialogCouponsCreateEditComponent, {
      width: '400px',
      maxWidth: '96vw',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadTable();
    });
  }

  openDialogEdit(coupon: Coupon): void {
    const dialogRef = this.matDialog.open(DialogCouponsCreateEditComponent, {
      width: '400px',
      maxWidth: '96vw',
      data: {
        dataEdit: coupon
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadTable();
    });
  }

}
