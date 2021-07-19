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
import {Utilities} from "../../../../../utils/Utilities";

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
  listPortCharge: any;

  constructor(
    private translate: TranslateService,
    private notifyService: NotifyService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private liquidationService: LiquidationService,
    private productsService: ProductsService,
    private portsService: PortsService
  ) {
    activatedRoute.params.subscribe(params => {
      this.idLiquidation = params.idLiquidation;
      this.loadInfo();
    });
  }

  ngOnInit(): void {
  }

  loadInfo(): void {
    this.preload = true;
    this.liquidationService.getById(this.idLiquidation).subscribe(res => {
      this.liquidation = res;
      this.preload = false;
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

      this.productsService.getInternationalAgreementByLocation(this.liquidation.product.id, this.liquidation?.port_origin?.location?.id, 0, 1000).subscribe(res => {
        this.listInternationalAgreement = res.results;
      });

      this.productsService.getGravaments(this.liquidation.product.id, 0, 1000).subscribe(res => {
        this.listGravament = res.results;
      });

      this.productsService.getSupportDocument(this.liquidation.product.id, 0, 1000).subscribe(res => {
        this.listSupportDocuments = res.results;
      });

      this.portsService.getPortCharge(this.liquidation.product.id, 0, 1000, this.liquidation.port_destination?.id, this.liquidation.container_type?.id).subscribe(res => {
        this.listPortCharge = res.results;
      });
    }, error => {
      this.preload = false;
    });
  }

  goToLiquidations(): void {
    this.router.navigate(['']);
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
      } else if (item === 3 && this.liquidation?.data?.insurance_cost) {
        result += +this.liquidation?.data?.insurance_cost;
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
    if (sumSelected <= numbersCFR) {
      return 'CFR';
    }
    const numbersCIF = Utilities.sumArray(Utilities.generateNumbers(3));
    if (sumSelected <= numbersCIF) {
      return 'CIF';
    }
    const numbersDDP = Utilities.sumArray(Utilities.generateNumbers(6));
    if (sumSelected <= numbersDDP) {
      return 'DDP';
    }
    return '';
  }
}
