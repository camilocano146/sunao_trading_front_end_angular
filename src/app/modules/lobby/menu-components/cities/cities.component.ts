import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AppComponent} from '../../../../app.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {TranslateService} from '@ngx-translate/core';
import {NotifyService} from '../../../../services/notify/notify.service';
import {MatDialog} from '@angular/material/dialog';
import {LocationService} from '../../../../services/location/location.service';
import {DialogCityCreateEditComponent} from './dialog-city-create-edit/dialog-city-create-edit.component';
import {Location} from '../../../../models/Location';
import {ActivatedRoute, Router} from '@angular/router';
import {ManageSessionStorage} from '../../../../utils/ManageSessionStorage';

export interface DataDialogCity {
  dataEdit: Location;
  idCountry: number;
}

@Component({
  selector: 'app-locations',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit, AfterViewInit {
  preload: boolean;
  list: Location[];
  public displayedColumns: string[] = [
    'index',
    'name',
    'actions'
  ];
  pageSizeOptions = AppComponent.pageSizeOptions;
  resultsLength: number;
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  idCountry: number;
  country: Location;

  constructor(
    private translate: TranslateService,
    private notifyService: NotifyService,
    private locationService: LocationService,
    private matDialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.idCountry = this.activatedRoute.snapshot.params.idCountry;
    this.country = ManageSessionStorage.getCountrySelected();
    if (isNaN(this.idCountry) || !this.country) {
      this.router.navigate(['lobby/locations']);
      return;
    }
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
    const page = this.paginator?.pageIndex ? this.paginator.pageIndex + 1 : 0;
    const limit = this.paginator?.pageSize ? this.paginator.pageSize : this.pageSizeOptions[0];
    this.locationService.getAllCitiesOfCountry(this.idCountry, page, limit).subscribe(
      value => {
        this.preload = false;
        this.list = value.results;
        this.resultsLength = value.count;
      }, error => {
        this.preload = false;
        this.notifyService.showErrorSnapshotLong(this.translate.instant('errors.connection_error'));
      }
    );
  }

  openDialogCreate(): void {
    const dialogRef = this.matDialog.open(DialogCityCreateEditComponent, {
      width: '100vw',
      maxWidth: '400px',
      data: {
        idCountry: this.idCountry
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadTable();
    });
  }

  openDialogEdit(location: Location): void {
    const dialogRef = this.matDialog.open(DialogCityCreateEditComponent, {
      width: '100vw',
      maxWidth: '400px',
      data: {
        dataEdit: location,
        idCountry: this.idCountry
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadTable();
    });
  }

  goToCities(): void {
    this.router.navigate(['lobby/locations']);
  }
}
