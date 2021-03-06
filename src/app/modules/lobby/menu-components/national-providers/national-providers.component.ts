import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AppComponent} from '../../../../app.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {TranslateService} from '@ngx-translate/core';
import {NotifyService} from '../../../../services/notify/notify.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogNationalProvidersCreateEditComponent} from './dialog-national-providers-create-edit/dialog-national-providers-create-edit.component';
import {Location} from '../../../../models/Location';
import {ProviderService} from '../../../../services/provider/provider.service';
import {Provider} from '../../../../models/Provider';
import Swal from 'sweetalert2';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-national-providers',
  templateUrl: './national-providers.component.html',
  styleUrls: ['./national-providers.component.scss']
})
export class NationalProvidersComponent implements OnInit {
  preload: boolean;
  list: Location[];
  public displayedColumns: string[] = [
    'id',
    'name',
    'address',
    'email',
    'phone',
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
    private providerService: ProviderService,
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
    if (this.timer) {
      window.clearTimeout(this.timer);
    }
    this.timer = window.setTimeout(() => {
      this.preload = true;
      this.list = undefined;
      const limit = this.paginator?.pageSize ? this.paginator.pageSize : this.pageSizeOptions[0];
      const page = this.paginator?.pageIndex ? this.paginator.pageIndex*limit : 0;
      this.providerService.getListNational(page, limit, this.formControlFilter.value).subscribe(
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

  openDialogEdit(provider: Provider): void {
    const dialogRef = this.matDialog.open(DialogNationalProvidersCreateEditComponent, {
      width: '100vw',
      maxWidth: '400px',
      data: provider
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadTable();
    });
  }

  openDialogCreate(): void {
    const dialogRef = this.matDialog.open(DialogNationalProvidersCreateEditComponent, {
      width: '100vw',
      maxWidth: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadTable();
    });
  }

  openDialogRemove(provider: Provider): void {
    Swal.fire({
      title: '??Confirma la eliminaci??n de este proveedor?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#007b8a',
      reverseButtons: true,
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.providerService.delete(provider.id).subscribe(value => {
          Swal.fire(
            'Proveedor Eliminado!',
            '',
            'success'
          );
          this.loadTable();
        }, error => {
          Swal.fire(
            'No fue posible eliminar el proveedor, por favor intente nuevamente!',
            '',
            'error'
          );
        });
      }
    });
  }

}
