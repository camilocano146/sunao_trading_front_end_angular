import {Component, OnInit, ViewChild} from '@angular/core';
import {Location} from '../../../../models/Location';
import {AppComponent} from '../../../../app.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {TranslateService} from '@ngx-translate/core';
import {NotifyService} from '../../../../services/notify/notify.service';
import {MatDialog} from '@angular/material/dialog';
import {LiquidationService} from '../../../../services/liquidation/liquidation.service';
import {FormControl} from '@angular/forms';
import {Liquidation} from '../../../../models/Liquidation';
import {Router} from '@angular/router';
import {DialogExportReportComponent} from '../../../common-components/dialog-export-report/dialog-export-report.component';
import {ReportsEnum} from '../../../../enums/Reports.enum';
import { UserService } from 'src/app/services/user/user.service';
import {SelectionModel} from '@angular/cdk/collections';
import {ManageSessionStorage} from '../../../../utils/ManageSessionStorage';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-liquidation',
  templateUrl: './liquidations.component.html',
  styleUrls: ['./liquidations.component.scss']
})
export class LiquidationsComponent implements OnInit {
  preload: boolean;
  list: Liquidation[];
  public displayedColumns: string[] = [
    'select',
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
  formControlReference: FormControl = new FormControl('');
  formControlOrigin: FormControl = new FormControl('');
  formControlDestination: FormControl = new FormControl('');
  formControlProduct: FormControl = new FormControl('');
  formControlDate: FormControl = new FormControl('');
  filterSelectedValue: any;
  values: any[] = ['CFR', 'CIF', 'DDP'];
  private timer: number;
  selection = new SelectionModel<number>(true, []);
  userPackage: boolean;

  constructor(
    private translate: TranslateService,
    private notifyService: NotifyService,
    private liquidationService: LiquidationService,
    private matDialog: MatDialog,
    private router: Router,
    private userService: UserService
  ) {
    this.userHasActivePackage();
    if (ManageSessionStorage.getListCompareLiquidations()) {
      this.selection.select(...ManageSessionStorage.getListCompareLiquidations());
    }
  }

  ngOnInit(): void {
  }

  openDialogCreate(): void {

  }

  userHasActivePackage(): void {
    this.userService.userHasActivePackage().subscribe(res => {
      this.userPackage = res.result;
      this.loadTable();
    });
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

    if (this.userPackage == false) {
      this.notifyService.showErrorLong('', 'Aún no tiene un plan activo, debe realizar la comprar de uno.');
      this.router.navigate(['import/plans']);
    } else {
      this.router.navigate([`lobby/liquidations-detail/${row.id}`]);
    }
  }

  exportDate(): void {
    const dialogRef = this.matDialog.open(DialogExportReportComponent, {
      width: '600px',
      maxWidth: '96vw',
      height: 'max-content',
      maxHeight: '96vh',
      backdropClass: 'backdrop-dark',
      panelClass: 'div-without-padding',
      data: ReportsEnum.LIQUIDATIONS
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  selectLiquidation(row: Liquidation, check: MatCheckbox): void {
    if (this.selection.selected.length >= 3 && check.checked) {
      this.notifyService.showErrorSnapshotLong('No puedes seleccionar más de 3 liquidaciones');
      check.checked = false;
      return;
    }
    this.selection.toggle(row.id);
    ManageSessionStorage.setListCompareLiquidations(this.selection.selected);
  }

  compareLiquidations(): void {
    this.router.navigate([`lobby/liquidations-comparator`]);
  }

  deselectItem(item: number): void {
    this.selection.deselect(item);
    ManageSessionStorage.setListCompareLiquidations(this.selection.selected);
  }

  goToNewLiquidation(): void {
    this.router.navigate(['/import']);
  }
}
