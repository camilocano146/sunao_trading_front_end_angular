import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AppComponent} from '../../../../app.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {TranslateService} from '@ngx-translate/core';
import {NotifyService} from '../../../../services/notify/notify.service';
import {MatDialog} from '@angular/material/dialog';
import {LocationService} from '../../../../services/location/location.service';
import {User} from '../../../../models/User';
import {DialogLocationCreateEditComponent} from './dialog-user-create/dialog-location-create-edit.component';
import {Location} from '../../../../models/Location';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit, AfterViewInit {
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

  constructor(
    private translate: TranslateService,
    private notifyService: NotifyService,
    private locationService: LocationService,
    private matDialog: MatDialog,
  ) {
    this.loadTable();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadTable(): void {
    this.preload = true;
    this.list = undefined;
    const page = this.paginator?.pageIndex ? this.paginator.pageIndex + 1 : 1;
    const limit = this.paginator?.pageSize ? this.paginator.pageSize : this.pageSizeOptions[0];
    console.log(page, limit);
    this.locationService.getAll(page, limit).subscribe(
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

  openDialogUserInfo(user: User): void {
    const dialogRef = this.matDialog.open(DialogLocationCreateEditComponent, {
      width: '100vw',
      maxWidth: '400px',
      data: user
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialogCreate(location?: Location): void {
    const dialogRef = this.matDialog.open(DialogLocationCreateEditComponent, {
      width: '100vw',
      maxWidth: '400px',
      data: location
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
