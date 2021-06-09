import {Component, OnInit, ViewChild} from '@angular/core';
import {Location} from '../../../../models/Location';
import {AppComponent} from '../../../../app.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {TranslateService} from '@ngx-translate/core';
import {NotifyService} from '../../../../services/notify/notify.service';
import {LocationService} from '../../../../services/location/location.service';
import {MatDialog} from '@angular/material/dialog';
import {LiquidationService} from '../../../../services/liquidation.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-liquidation',
  templateUrl: './liquidations.component.html',
  styleUrls: ['./liquidations.component.scss']
})
export class LiquidationsComponent implements OnInit {
  preload: boolean;
  list: Location[];
  public displayedColumns: string[] = [
    'index',
    'email',
    'firstName',
    'document',
    'userInfo'
  ];
  pageSizeOptions = AppComponent.pageSizeOptions;
  resultsLength: number;
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  listLocations: Location[];
  formControlReference: FormControl = new FormControl();
  formControlOrigin: FormControl = new FormControl();
  formControlDestination: FormControl = new FormControl();
  formControlProduct: FormControl = new FormControl();
  filterSelectedValue: any;
  values: any[];

  constructor(
    private translate: TranslateService,
    private notifyService: NotifyService,
    private liquidationService: LiquidationService,
    private matDialog: MatDialog,
  ) {
    this.loadTable();
  }

  ngOnInit(): void {
  }

  openDialogCreate(): void {

  }

  loadTable(): void {
    this.preload = true;
    this.list = undefined;
    const page = this.paginator?.pageIndex ? this.paginator.pageIndex + 1 : 1;
    const limit = this.paginator?.pageSize ? this.paginator.pageSize : this.pageSizeOptions[0];
    console.log(page, limit);
    this.liquidationService.getAll(page, limit).subscribe(
      value => {
        this.preload = false;
        this.list = value.body.users;
        this.resultsLength = value.body.total;
      }, error => {
        this.preload = false;
        this.notifyService.showErrorSnapshotLong(this.translate.instant('errors.connection_error'));
      }
    );
  }

  changeOriginAutocomplete() {

  }

  onSelectOptionOrigin(option: any) {

  }
}
