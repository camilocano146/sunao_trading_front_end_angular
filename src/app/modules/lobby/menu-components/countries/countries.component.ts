import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AppComponent} from '../../../../app.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {TranslateService} from '@ngx-translate/core';
import {NotifyService} from '../../../../services/notify/notify.service';
import {MatDialog} from '@angular/material/dialog';
import {LocationService} from '../../../../services/location/location.service';
import {User} from '../../../../models/User';
import {DialogCountryCreateEditComponent} from './dialog-country-create-edit/dialog-country-create-edit.component';
import {Location} from '../../../../models/Location';
import {Router} from '@angular/router';
import {ManageSessionStorage} from '../../../../utils/ManageSessionStorage';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-locations',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit, AfterViewInit {
  preload: boolean;
  list: Location[];
  public displayedColumns: string[] = [
    'id',
    'name',
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
    private locationService: LocationService,
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
      this.locationService.getAllCountries(page, limit, this.formControlFilter.value).subscribe(
        value => {
          this.preload = false;
          this.list = value.results;
          this.resultsLength = value.count;
        }, error => {
          this.preload = false;
          this.notifyService.showErrorSnapshotLong(this.translate.instant('errors.connection_error'));
        });
    }, AppComponent.timeMillisDelayFilter);
  }

  openDialogCreate(): void {
    const dialogRef = this.matDialog.open(DialogCountryCreateEditComponent, {
      width: '100vw',
      maxWidth: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadTable();
    });
  }

  openDialogEdit(location: Location): void {
    const dialogRef = this.matDialog.open(DialogCountryCreateEditComponent, {
      width: '100vw',
      maxWidth: '400px',
      data: location
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadTable();
    });
  }

  goToCities(location: Location): void {
    ManageSessionStorage.setCountrySelected(location);
    this.router.navigate(['lobby/locations/cities/', location.id]);
  }
}
