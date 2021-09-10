import {Component, OnInit} from '@angular/core';
import {NotifyService} from '../../../../../services/notify/notify.service';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LiquidationService} from '../../../../../services/liquidation/liquidation.service';
import {Liquidation} from '../../../../../models/Liquidation';
import {ProductsService} from '../../../../../services/products/products.service';
import {Gravamen} from '../../../../../models/Gravamen';
import {SupportDocument} from '../../../../../models/SupportDocument';
import {PortsService} from '../../../../../services/ports/ports.service';
import {Utilities} from '../../../../../utils/Utilities';
import {TradeRegimen} from 'src/app/models/TradeRegimen';
import {ManageSessionStorage} from '../../../../../utils/ManageSessionStorage';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/models/User';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user/user.service';
import { DialogVerifyAccountComponent } from '../../../settings-components/profile/dialog-verify-account/dialog-verify-account.component';

interface HeaderData {
  name: string;
  iconPath: string;
}

@Component({
  selector: 'app-dashboards',
  templateUrl: './liquidation-comparator.component.html',
  styleUrls: ['./liquidation-comparator.component.scss']
})
export class LiquidationComparatorComponent implements OnInit {
  list: any;
  preload: boolean;
  idLiquidation: number;
  liquidations: Liquidation[];
  liquidationsHeaders: HeaderData[] = [
    {name: 'a', iconPath: ''}
  ];
  seeIVA: boolean;
  listGravament: Gravamen[];
  listInternationalAgreement: any;
  listSupportDocuments: SupportDocument[];
  listPortCharge: any;
  listTradeRegimes: TradeRegimen[];
  showError: boolean = true;
  public min_total=0;
  filterFormControl:FormControl;

  // 
  listSelectedItems: number[] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];

  constructor(
    private translate: TranslateService,
    private notifyService: NotifyService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private liquidationService: LiquidationService,
    private matDialog: MatDialog,
    private userService: UserService
  ) {
    this.verifyUser();
    this.filterFormControl = new FormControl();
    this.filterFormControl.setValue(this.listSelectedItems)
  }

  ngOnInit(): void {
    
  }

  verifyUser(){
    let user:User;
    this.userService.getUser().subscribe(res=>{
      user= res;
      if(user.is_verify){
        this.getLiquidations();
      }else{
        const dialogRef = this.matDialog.open(DialogVerifyAccountComponent, {
          width: '400px',
          maxWidth: '96vw',
          backdropClass: 'backdrop-dark',
          panelClass: 'div-without-padding',
        });
        dialogRef.afterClosed().subscribe(result => {
          if(result=='Verify'){
            this.getLiquidations();
          }else{
            this.router.navigate(['/lobby'])
          }
        });
      }
    })
    
  }
  


  getLiquidations(): void {
    this.preload = true;
    this.showError = false;
    const body = {
      list_liquidations: ManageSessionStorage.getListCompareLiquidations()
    };
    this.liquidationService.getManyById(body).subscribe(res => {
      this.liquidations = res;
      this.calculateMinTotal();
      this.preload = false;
    }, error => {
      this.showError = true;
      this.preload = false;
    });
  }

  goToLiquidations(): void {
    this.router.navigate(['']);
  }

  calculateTotalValue(liquidation: Liquidation): number {
    let result = 0;
    if (liquidation?.fob_cost) {
      result += +liquidation?.fob_cost;
    }  if (liquidation?.data?.international_freight_cost) {
      result += +liquidation?.data?.international_freight_cost;
    }  if (liquidation?.data?.insurance_cost) {
      result += +liquidation?.data?.insurance_cost;
    }  if (liquidation?.data?.port_charge) {
      result += +liquidation?.data?.port_charge;
    }  if (liquidation?.data?.gravamen_tarif) {
      result += +liquidation?.data?.gravamen_tarif;
    }  if (liquidation?.data?.national_freight_cost) {
      result += +liquidation?.data?.national_freight_cost;
    }
    return result;
  }

  calculateMinTotal(){
    this.min_total=this.calculateTotalValue(this.liquidations[0]);
    for (let i = 0; i < this.liquidations.length; i++) {
      let total= this.calculateTotalValue(this.liquidations[i]);
      this.min_total = total < this.min_total? total: this.min_total;
    }
  }


  clickFilterButtons(position: number): void {
    const item = this.listSelectedItems.findIndex(v => v === position);
    if (item !== -1) {
      this.listSelectedItems.splice(item, 1);
    } else {
      this.listSelectedItems.push(position);
    }
  }

  selectedFilterButton(position: number): boolean {
    return this.listSelectedItems.findIndex(v => v === position) !== -1;
  }

  
}
