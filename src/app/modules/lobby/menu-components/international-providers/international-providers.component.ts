import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AppComponent} from '../../../../app.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {TranslateService} from '@ngx-translate/core';
import {NotifyService} from '../../../../services/notify/notify.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogProviderCreateEditComponent} from './dialog-provider-create-edit/dialog-provider-create-edit.component';
import {Location} from '../../../../models/Location';
import {ProviderService} from '../../../../services/provider/provider.service';
import {Provider} from '../../../../models/Provider';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-international-providers',
  templateUrl: './international-providers.component.html',
  styleUrls: ['./international-providers.component.scss']
})
export class InternationalProvidersComponent implements OnInit, AfterViewInit {
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
    this.preload = true;
    this.list = undefined;
    const limit = this.paginator?.pageSize ? this.paginator.pageSize : this.pageSizeOptions[0];
    const page = this.paginator?.pageIndex ? this.paginator.pageIndex*limit : 0;
    this.providerService.getListInternational(page, limit).subscribe(
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

  openDialogEdit(provider: Provider): void {
    const dialogRef = this.matDialog.open(DialogProviderCreateEditComponent, {
      width: '100vw',
      maxWidth: '400px',
      data: provider
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadTable();
    });
  }

  openDialogCreate(): void {
    const dialogRef = this.matDialog.open(DialogProviderCreateEditComponent, {
      width: '100vw',
      maxWidth: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadTable();
    });
  }

  openDialogRemove(provider: Provider): void {
    Swal.fire({
      title: '¿Confirma la eliminación de este proveedor?',
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
