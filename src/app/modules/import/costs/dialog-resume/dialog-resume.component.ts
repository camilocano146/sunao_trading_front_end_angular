import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DataDialogChapter} from '../../../lobby/menu-components/chapters/chapters.component';
import {ImportCost} from '../../../../models/ImportCost';
import {Utilities} from '../../../../utils/Utilities';
import {ManageLocalStorage} from '../../../../utils/ManageLocalStorage';
import {DialogLoginComponent} from '../dialog-login/dialog-login.component';
import {Router} from '@angular/router';
import {LiquidationService} from '../../../../services/liquidation/liquidation.service';
import {Liquidation} from '../../../../models/Liquidation';
import {NotifyService} from "../../../../services/notify/notify.service";

@Component({
  selector: 'app-dialog-resume',
  templateUrl: './dialog-resume.component.html',
  styleUrls: ['./dialog-resume.component.scss']
})
export class DialogResumeComponent implements OnInit {
  util = Utilities;
  preload: boolean;

  constructor(
    public matDialogRef: MatDialogRef<DialogResumeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImportCost,
    public matDialog: MatDialog,
    public router: Router,
    public liquidationService: LiquidationService,
    private notifyService: NotifyService,
  ) { }

  ngOnInit(): void {
  }

  liquidate(): void {
    if (ManageLocalStorage.getToken()) {
      this.callServiceLiquidation();
    } else {
      this.openDialogLogin();
    }
  }

  openDialogLogin(): void {
    const dialogRef = this.matDialog.open(DialogLoginComponent, {
      width: '350px',
      maxHeight: '96vh',
      backdropClass: 'backdrop-dark',
      panelClass: 'div-without-padding'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.callServiceLiquidation();
      }
    });
  }

  callServiceLiquidation(): void {
    this.preload = true;
    const liquidate = this.buildLiquidate();
    this.liquidationService.liquidate(liquidate).subscribe(res => {
      const userHastActivePackage = res.User_has_active_package;
      if (!userHastActivePackage) {
        this.router.navigate(['import/plans']);
      } else {
        this.router.navigate(['lobby']);
      }
      this.matDialogRef.close();
      this.preload = false;
    }, error => {
      this.preload = false;
      this.notifyService.showError('', 'No fué posible registrar la liquidación, por favor intente nuevamente.');
    });
  }

  private buildLiquidate(): Liquidation {
    return {
      currency: this.data.currency.abbreviation,
      city_destination_id: this.data.cityIcoterm ? this.data.cityIcoterm.id : null,
      container_type_id: this.data.container.id,
      fob_cost: this.data.fobValue,
      incoterm: this.data.incoterm.name,
      port_origin_id: this.data.portOrigin.id,
      port_destination_id: this.data.portDestination.id,
      product_id: this.data.product.id
    };
  }
}
