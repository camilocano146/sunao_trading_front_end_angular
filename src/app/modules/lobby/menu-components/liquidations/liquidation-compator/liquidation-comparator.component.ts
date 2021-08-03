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

  constructor(
    private translate: TranslateService,
    private notifyService: NotifyService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private liquidationService: LiquidationService,
  ) {
    this.getLiquidations();
  }

  ngOnInit(): void {
  }

  getLiquidations(): void {
    this.preload = true;
    this.showError = false;
    const body = {
      list_liquidations: ManageSessionStorage.getListCompareLiquidations()
    };
    this.liquidationService.getManyById(body).subscribe(res => {
      this.liquidations = res;
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
    } else if (liquidation?.data?.international_freight_cost) {
      result += +liquidation?.data?.international_freight_cost;
    } else if (liquidation?.data?.insurance_cost) {
      result += +liquidation?.data?.insurance_cost;
    } else if (liquidation?.data?.port_charge) {
      result += +liquidation?.data?.port_charge;
    } else if (liquidation?.data?.gravamen_tarif) {
      result += +liquidation?.data?.gravamen_tarif;
    } else if (liquidation?.data?.national_freight_cost) {
      result += +liquidation?.data?.national_freight_cost;
    }
    return result;
  }
}
