import { Component, OnInit } from '@angular/core';
import {NotifyService} from '../../../../../services/notify/notify.service';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LiquidationService} from '../../../../../services/liquidation/liquidation.service';
import {IncotermType, Liquidation} from '../../../../../models/Liquidation';
import {ProductsService} from '../../../../../services/products/products.service';
import {Gravamen} from '../../../../../models/Gravamen';
import {SupportDocument} from '../../../../../models/SupportDocument';
import {PortsService} from '../../../../../services/ports/ports.service';
import {Utilities} from '../../../../../utils/Utilities';
import { TradeRegimen } from 'src/app/models/TradeRegimen';
import {DialogExportReportComponent} from '../../../../common-components/dialog-export-report/dialog-export-report.component';
import {ReportsEnum} from '../../../../../enums/Reports.enum';
import {DialogExportSendLiquidationComponent} from '../dialog-export-send-liquidation/dialog-export-send-liquidation.component';
import {MatDialog} from '@angular/material/dialog';
import {ExportSendLiquidation} from '../../../../../enums/ExportSendLiquidation';
import { DialogVerifyAccountComponent } from '../../../settings-components/profile/dialog-verify-account/dialog-verify-account.component';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-dashboards',
  templateUrl: './liquidation-details.component.html',
  styleUrls: ['./liquidation-details.component.scss']
})
export class LiquidationDetailsComponent implements OnInit {
  list: any;
  preload: boolean;
  idLiquidation: number;
  liquidation: Liquidation;
  seeIVA: boolean;
  listSelectedItems: number[] = [];
  listGravament: Gravamen[];
  listInternationalAgreement: any;
  listSupportDocuments: SupportDocument[];
  
  listPortCharge: Array<any>=[];
  valuePortCharge:number=0;
  listNationalCost: Array<any>=[];
  valueNationalCost:number=0;
  listStorageChargeByDay: Array<any>=[];
  valueStorageChargeByDay:number=0;
  listTradeRegimes: TradeRegimen[];

  constructor(
    private translate: TranslateService,
    private notifyService: NotifyService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private liquidationService: LiquidationService,
    private productsService: ProductsService,
    private portsService: PortsService,
    private matDialog: MatDialog,
    private userService: UserService
  ) {
    activatedRoute.params.subscribe(params => {
      this.idLiquidation = params.idLiquidation;
      this.verifyUser();
    });
  }

  ngOnInit(): void {
  }


  verifyUser(){
    let user:User;
    this.userService.getUser().subscribe(res=>{
      user= res;
      if(user.is_verify){
        this.loadInfo();
      }else{
        const dialogRef = this.matDialog.open(DialogVerifyAccountComponent, {
          width: '400px',
          maxWidth: '96vw',
          backdropClass: 'backdrop-dark',
          panelClass: 'div-without-padding',
        });
        dialogRef.afterClosed().subscribe(result => {
          if(result=='Verify'){
            this.loadInfo();
          }else{
            this.router.navigate(['/lobby'])
          }
        });
      }
    })
    
  }
  

  loadInfo(): void {
    this.preload = true;
    this.liquidationService.getById(this.idLiquidation).subscribe(res => {
      this.liquidation = res;
      switch (this.liquidation.incoterm) {
        case 'CFR':
          this.listSelectedItems.push(0, 1);
          break;
        case 'CIF':
          this.listSelectedItems.push(0, 1, 2);
          break;
        case 'DDP':
          this.listSelectedItems.push(0, 1, 2, 3, 4, 5);
          break;
      }

      this.liquidationService.getInternationalAgreementByLocation(this.liquidation.id, this.liquidation?.port_origin?.location?.id, 0, 1000).subscribe(res => {
        this.listInternationalAgreement = res.results;
      });

      this.liquidationService.getGravaments(this.liquidation.id, 0, 1000).subscribe(res => {
        this.listGravament = res.results;
      });

      this.liquidationService.getSupportDocument(this.liquidation.id, 0, 1000).subscribe(res => {
        this.listSupportDocuments = res.results;
      });

      this.liquidationService.getTradeRegimen(this.liquidation.id, 0, 1000).subscribe(res=>{
        this.listTradeRegimes = res.results;
      });

      this.portsService.getPortCharge(this.liquidation.product.id, 0, 1000, this.liquidation.id).subscribe(res => {
        this.initPortsCharges(res.results);
      });

      
    }, error => {
      this.preload = false;
    });
  }

  goToLiquidations(): void {
    this.router.navigate(['']);
  }

  initPortsCharges(list:Array<any>):void{
    list.forEach(p => {
      if(p.group==='almacenaje_de_contenedor_por_dia'){
        this.listStorageChargeByDay.push(p);
        this.valueStorageChargeByDay+=(p.value/ this.liquidation?.currency_usd.value);
      }else if(p.group==='gasto_portuario'){
        this.listPortCharge.push(p);
        this.valuePortCharge+=(p.value/ this.liquidation?.currency_usd.value);
      }else{
        this.listNationalCost.push(p);
        this.valueNationalCost+=(p.value/ this.liquidation?.currency_usd.value);
      }
      console.log(p)
    });
    this.preload = false;

  }

  showIVA(): void {
    setInterval(() => {
      // @ts-ignore
      // document.getElementsByTagName('mat-sidenav-content')?.scroll(100, 2000);
      // console.log('qwpeqpwoe');
    }, 500);
  }

  isIncotermCFR(): boolean {
    return this.liquidation?.incoterm === 'CFR';
  }

  isIncotermCIF(): boolean {
    return this.liquidation?.incoterm === 'CIF';
  }

  isIncotermDDP(): boolean {
    return this.liquidation?.incoterm === 'DDP';
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

  calculateTotalValue(): number {
    let result = 0;
    for (const item of this.listSelectedItems) {
      if (item === 0 && this.liquidation?.fob_cost) {
        result += +this.liquidation?.fob_cost;
      } else if (item === 1 && this.liquidation?.data?.international_freight_cost) {
        result += +this.liquidation?.data?.international_freight_cost;
      } else if (item === 2 && this.liquidation?.data?.insurance_cost) {
        result += +this.liquidation?.data?.insurance_cost;
      } else if (item === 3 && this.liquidation?.data?.port_charge) {
        result += +this.liquidation?.data?.port_charge;
      } else if (item === 4 && this.liquidation?.data?.gravamen_tarif) {
        result += +this.liquidation?.data?.gravamen_tarif;
      } else if (item === 5 && this.liquidation?.data?.national_freight_cost) {
        result += +this.liquidation?.data?.national_freight_cost;
      }
    }
    return result;
  }

  getCalculateIcoterm(): string {
    const sumSelected = Utilities.sumArray(this.listSelectedItems);
    const numbersCFR = Utilities.sumArray(Utilities.generateNumbers(2));
    if (sumSelected == numbersCFR) {
      return 'CFR';
    }
    const numbersCIF = Utilities.sumArray(Utilities.generateNumbers(3));
    if (sumSelected == numbersCIF) {
      return 'CIF';
    }
    const numbersDDP = Utilities.sumArray(Utilities.generateNumbers(6));
    if (sumSelected == numbersDDP) {
      return 'DDP';
    }
    return '';
  }

  exportLiquidation(): void {
    const dialogRef = this.matDialog.open(DialogExportSendLiquidationComponent, {
      width: '400px',
      maxWidth: '96vw',
      height: 'max-content',
      maxHeight: '96vh',
      backdropClass: 'backdrop-dark',
      panelClass: 'div-without-padding',
      data: {
        type: ExportSendLiquidation.EXPORT,
        id_liquidation : this.idLiquidation
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  sendLiquidation(): void {
    const dialogRef = this.matDialog.open(DialogExportSendLiquidationComponent, {
      width: '400px',
      maxWidth: '96vw',
      height: 'max-content',
      maxHeight: '96vh',
      backdropClass: 'backdrop-dark',
      panelClass: 'div-without-padding',
      data:{
        type: ExportSendLiquidation.SEND,
        id_liquidation : this.idLiquidation
      } ,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
