import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Location} from '../../../models/Location';
import {Container} from '../../../models/Container';
import {MatDialog} from '@angular/material/dialog';
import {DialogResumeComponent} from './dialog-resume/dialog-resume.component';
import {DialogHelpComponent} from './dialog-help/dialog-help.component';
import {Port} from '../../../models/Port';
import {LocationService} from '../../../services/location/location.service';
import {PortsService} from '../../../services/ports/ports.service';
import {AppComponent} from '../../../app.component';
import {Subscription} from 'rxjs';
import {ContainerService} from '../../../services/container/container.service';
import {ImportCost} from '../../../models/ImportCost';
import {Currency} from '../../../models/Currency';
import {Utilities} from '../../../utils/Utilities';
import {Incoterm} from '../../../models/Incoterm';
import {ProductsService} from '../../../services/products/products.service';
import {Product} from '../../../models/Product';
import {ActivatedRoute} from '@angular/router';
import {LiquidationService} from '../../../services/liquidation/liquidation.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NotifyService} from '../../../services/notify/notify.service';
import Swal from 'sweetalert2';

interface Step {
  imagePath: string;
  name: string;
}

@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.scss']
})
export class CostsComponent implements OnInit {
  limit = 10;
  limitContainers = 10;
  listStepper: Step[] = [
    {imagePath: './assets/import/menu/location.svg', name: 'Origen Destino'},
    {imagePath: './assets/import/menu/clipboard.svg', name: 'Producto o partida aracelaria'},
    {imagePath: './assets/import/menu/money.svg', name: 'FOB Divisa'},
    {imagePath: './assets/import/menu/worldwide-shipping.svg', name: 'Contenedor'},
    {imagePath: './assets/import/menu/internet.svg', name: 'Incoterm'},
    {imagePath: './assets/import/menu/cheque.svg', name: 'Liquidar'},
  ];
  formControlOrigin: FormControl = new FormControl('', [Validators.required]);
  formControlOriginPort: FormControl = new FormControl('', [Validators.required]);
  formControlDestination: FormControl = new FormControl('', [Validators.required]);
  formControlDestinationPort: FormControl = new FormControl('', [Validators.required]);
  lastOriginSelected: Location;
  lastDestinationSelected: Location;
  // lastPortOriginSelected: Port;
  // lastPortDestinationSelected: Port;
  listLocationsOrigin: Location[] = [
    // {name: 'Malaga', type: '1', father_location: undefined},
    // {name: 'Pontevedra', type: '1', father_location: undefined},
    // {name: 'Sevilla', type: '1', father_location: undefined},
  ];
  listLocationsDestination: Location[] = [
    // {name: 'Malaga', type: '1', father_location: undefined},
    // {name: 'Pontevedra', type: '1', father_location: undefined},
    // {name: 'Sevilla', type: '1', father_location: undefined},
  ];
  listPortsOrigin: Port[] = [];
  listPortsDestination: Port[] = [];
  currentStep = 0;
  formControlProductName: FormControl = new FormControl('', []);
  formControlTariffHeading: FormControl = new FormControl('', []);
  formControlValueFOB: FormControl = new FormControl('', [Validators.required]);
  listProduct: Product[];
  listCurrencies: Currency[] = [
    {name: 'Euro', abbreviation: 'EUR', imageCountry: './assets/flags/union-europea.svg'},
    {name: 'Dolar', abbreviation: 'USD', imageCountry: './assets/flags/estados-unidos.svg'},
    {name: 'Libra', abbreviation: 'GBP', imageCountry: './assets/flags/reino-unido.svg'},
    {name: 'Peso', abbreviation: 'COP', imageCountry: './assets/flags/colombia.svg'},
  ];
  listContainers: Container[] = [];
  formControlCityIcoterm: FormControl = new FormControl('', [Validators.required]);
  incotermCostSelected: number;
  listIncoterm: Incoterm[] = [
    {name: 'CFR', description: 'Cost and freight'},
    {name: 'CIF', description: 'Cost, insurance and freight'},
    {name: 'DDP', description: 'Delivered Duty Paid'},
  ];
  selectedIncoterm: Incoterm;
  private timer: number;
  private timerCityIncoterm: number;
  private timerProducts: number;
  private listSubscribesLocation: Subscription[] = [];
  private listSubscribesLocationIncoterm: Subscription[] = [];
  defaultLatitude = 0;
  defaultLongitude = 0;
  selectedCurrency: Currency;
  selectedContainer: Container;
  util = Utilities;
  lastSelectedIcotermCity: Location;
  selectedProduct: Product;
  listLocationsIcoterm: Location[];
  preloadCityOrigin: boolean;
  preloadCityDestination: boolean;
  preloadCityPortOrigin: any;
  preloadCityPortDestination: boolean;
  preloadCityIncoterm: boolean;
  preloadProducts: boolean;
  preloadLiquidation: boolean;
  preloadFinalization: boolean;
  private changeSelectedOrigin: boolean;
  private changeSelectedDestination: boolean;

  constructor(
    public matDialog: MatDialog,
    public locationService: LocationService,
    public portsService: PortsService,
    public containerService: ContainerService,
    public productsService: ProductsService,
    public activatedRoute: ActivatedRoute,
    public liquidationService: LiquidationService,
    public notifyService: NotifyService,
  ) { }

  ngOnInit(): void {
    this.getAllCountries(this.formControlOrigin, true);
    this.getContainers();
    this.getProducts();
    this.loadReuseLiquidation();
  }

  /**
   * Se usa para reutilizar una liquidación si se seleccionó en la tabla liquidaciones esta opción
   */
  loadReuseLiquidation(): void {
    this.preloadLiquidation = true;
    const interval = setInterval(() => {
      if (this.isReadyMinInit()) {
        clearInterval(interval);
        // const liquidationReuse = ManageSessionStorage.getLiquidationReuse();
        this.activatedRoute.queryParams.subscribe(res => {
          const idLiquidation = res.id_liquidation;
          if (idLiquidation) {
            this.liquidationService.getById(idLiquidation).subscribe(async res => {
              const liquidationReuse = res;
              this.lastOriginSelected = liquidationReuse.port_origin?.location;
              this.formControlOrigin.setValue(this.lastOriginSelected.name);
              // this.lastPortOriginSelected = liquidationReuse.port_origin;
              this.lastDestinationSelected = liquidationReuse.port_destination?.location;
              this.formControlDestination.setValue(this.lastDestinationSelected.name);
              const res1 = await this.getPorts(this.lastOriginSelected, this.formControlOriginPort);
              this.formControlOriginPort.setValue(res1.find(p => p.id === liquidationReuse.port_origin.id));
              const res2 = await this.getPorts(this.lastDestinationSelected, this.formControlDestinationPort);
              // this.lastPortDestinationSelected = liquidationReuse.port_destination;
              this.formControlDestinationPort.setValue(res2.find(p => p.id === liquidationReuse.port_destination.id));
              const productFound = this.listProduct.find(p => p.id === liquidationReuse.product.id);
              if (productFound) {
                this.selectedProduct = productFound;
              } else {
                this.selectedProduct = liquidationReuse.product;
                this.listProduct.unshift(liquidationReuse.product);
              }
              this.formControlValueFOB.setValue(liquidationReuse.fob_cost);
              this.selectedCurrency = this.listCurrencies.find(c => c.abbreviation === liquidationReuse.currency?.acronym);
              this.selectedContainer = this.listContainers.find(c => c.id === liquidationReuse.container_type.id);
              this.selectedIncoterm = this.listIncoterm.find(i => i.name === liquidationReuse.incoterm);
              this.lastSelectedIcotermCity = liquidationReuse.city_destination;
              this.formControlCityIcoterm.setValue(this.lastSelectedIcotermCity?.name);
              this.preloadLiquidation = false;
            }, err => {
              this.preloadLiquidation = false;
            });
          } else {
            this.preloadLiquidation = false;
          }
        });
      }
    }, 300);
  }

  isReadyMinInit(): boolean {
    return  this.listContainers.length > 0;
  }

  getContainers(): void {
    this.containerService.getAll(0, this.limitContainers).subscribe(value => {
      this.listContainers = value.results;
      this.listContainers[0].dimension = {long: 20, width: 8, height: 6};
      this.listContainers[0].weight = 2300;
      this.listContainers[0].capacity = 25000;
      this.listContainers[0].img = {width: 70, color: '#ffbf3b'};
      this.listContainers[1].dimension = {long: 40, width: 8, height: 6};
      this.listContainers[1].weight = 3570;
      this.listContainers[1].capacity = 8268.8;
      this.listContainers[1].img = {width: 80, color: '#007b8a'};
      this.listContainers[2].dimension = {long: 11.575, width: 2.285, height: 2.250};
      this.listContainers[2].weight = 4800;
      this.listContainers[2].capacity = 10584;
      this.listContainers[2].img = {width: 80, color: '#ffbf3b'};
    });
  }

  getProducts(formControl?: FormControl): void {
    if (this.timerProducts) {
      window.clearTimeout(this.timerProducts);
    }
    this.timerProducts = window.setTimeout(() => {
      this.preloadProducts = true;
      this.listProduct?.splice(0, this.listProduct?.length);
      this.selectedProduct = undefined;
      const text = formControl?.value || '';
      this.productsService.getListProductsNoAuth(0, 30, text).subscribe(res => {
        this.listProduct = res.results;
        this.preloadProducts = false;
      }, error => {
        this.preloadProducts = false;
      });
    }, AppComponent.timeMillisDelayFilter);
  }

  getAllCountries(formControl: FormControl, onInit?: boolean): void {
    if (this.changeSelectedOrigin || this.changeSelectedDestination) {
      this.changeSelectedOrigin = false;
      this.changeSelectedDestination = false;
      return;
    }
    if (formControl === this.formControlOrigin && this.lastOriginSelected?.name?.toUpperCase() !== this.formControlOrigin?.value?.toUpperCase()) {
      this.lastOriginSelected = undefined;
    } else if (!this.changeSelectedDestination && formControl === this.formControlDestination && this.lastDestinationSelected?.name?.toUpperCase() !== this.formControlDestination?.value?.toUpperCase()) {
      this.lastDestinationSelected = undefined;
    }
    if (formControl === this.formControlOrigin && this.lastOriginSelected || formControl === this.formControlDestination && this.lastDestinationSelected) {
      return;
    }
    if (this.timer && !onInit) {
      window.clearTimeout(this.timer);
    }
    this.timer = window.setTimeout(() => {
      if (!onInit) {
        for (const subscribeL of this.listSubscribesLocation) {
          subscribeL.unsubscribe();
        }
      }
      if (formControl === this.formControlOrigin) {
        this.preloadCityOrigin = true;
        this.listLocationsOrigin?.splice(0, this.listLocationsOrigin?.length);
      } else {
        this.preloadCityDestination = true;
        this.listLocationsDestination?.splice(0, this.listLocationsDestination?.length);
      }
      this.listSubscribesLocation.splice(0, this.listSubscribesLocation.length);
      const subscribeLocation = this.locationService.getAllPublicCountries(0, this.limit, formControl.value);
      this.listSubscribesLocation.push(subscribeLocation.subscribe(res => {
        // console.log(res);
        if (onInit) {
          this.listLocationsOrigin = res.results;
          this.listLocationsDestination = JSON.parse(JSON.stringify(res.results));
          this.preloadCityOrigin = false;
          this.preloadCityDestination = false;
          return;
        }
        if (formControl === this.formControlOrigin) {
          this.listLocationsOrigin = res.results;
        } else {
          this.listLocationsDestination = res.results;
        }
        this.preloadCityOrigin = false;
        this.preloadCityDestination = false;
      }, error => {
        this.preloadCityOrigin = false;
        this.preloadCityDestination = false;
      }));
    }, AppComponent.timeMillisDelayFilter);
  }

  getAllCitiesIncotermStep(): void {
    if (this.lastSelectedIcotermCity?.name?.toUpperCase() !== this.formControlCityIcoterm?.value?.toUpperCase()) {
      this.lastSelectedIcotermCity = undefined;
    }
    if (this.lastSelectedIcotermCity) {
      return;
    }
    if (this.timerCityIncoterm) {
      window.clearTimeout(this.timerCityIncoterm);
    }
    this.timerCityIncoterm = window.setTimeout(() => {
      for (const subscribeL of this.listSubscribesLocationIncoterm) {
        subscribeL.unsubscribe();
      }
      this.preloadCityIncoterm = true;
      this.listLocationsIcoterm?.splice(0, this.listLocationsIcoterm?.length);
      this.listSubscribesLocationIncoterm.splice(0, this.listSubscribesLocationIncoterm.length);
      const subscribeLocation = this.locationService.getPublicAllCitiesByCountry(this.lastDestinationSelected.id, 0, this.limit, this.formControlCityIcoterm.value);
      this.listSubscribesLocationIncoterm.push(subscribeLocation.subscribe(res => {
        this.listLocationsIcoterm = res.results;
        this.preloadCityIncoterm = false;
      }, error => {
        this.preloadCityIncoterm = false;
      }));
    }, AppComponent.timeMillisDelayFilter);
  }

  getAllPorts(city: Location, formControl: FormControl): void {
    if (formControl === this.formControlOriginPort) {
      this.formControlOriginPort.reset();
    } else if (formControl === this.formControlDestinationPort) {
      this.formControlDestinationPort.reset();
    }
    if (this.timer) {
      window.clearTimeout(this.timer);
    }
    this.timer = window.setTimeout(() => {
      for (const subscribeL of this.listSubscribesLocation) {
        subscribeL.unsubscribe();
      }
      if (formControl === this.formControlOriginPort) {
        this.preloadCityPortOrigin = true;
        this.listPortsOrigin?.splice(0, this.listPortsOrigin?.length);
      } else {
        this.preloadCityPortDestination = true;
        this.listPortsDestination?.splice(0, this.listPortsDestination?.length);
      }
      this.listSubscribesLocation.splice(0, this.listSubscribesLocation.length);
      const subscribeLocation = this.portsService.getPublicListPorts(city.id, 0, this.limit, formControl.value);
      this.listSubscribesLocation.push(subscribeLocation.subscribe(res => {
        if (formControl === this.formControlOriginPort) {
          this.listPortsOrigin = res.results;
        } else {
          this.listPortsDestination = res.results;
        }
        this.preloadCityPortOrigin = false;
        this.preloadCityPortDestination = false;
      }, error => {
        this.preloadCityPortOrigin = false;
        this.preloadCityPortDestination = false;
      }));
    }, AppComponent.timeMillisDelayFilter);
  }

  async getPorts(city: Location, formControl: FormControl): Promise<any> {
    if (formControl === this.formControlOriginPort) {
      this.preloadCityPortOrigin = true;
      this.listPortsOrigin?.splice(0, this.listPortsOrigin?.length);
    } else {
      this.preloadCityPortDestination = true;
      this.listPortsDestination?.splice(0, this.listPortsDestination?.length);
    }
    try {
      const res = await this.portsService.getPublicListPorts(city.id, 0, this.limit, formControl.value).toPromise();
      if (formControl === this.formControlOriginPort) {
        this.listPortsOrigin = res.results;
      } else {
        this.listPortsDestination = res.results;
      }
      this.preloadCityPortOrigin = false;
      this.preloadCityPortDestination = false;
      return res.results;
    } catch (e) {
      return null;
    }
  }

  // changeOriginAutocomplete(formControl: FormControl): void {
  // }

  onSelectOptionOrigin(option: Location): void {
    this.changeSelectedOrigin = true;
    this.lastOriginSelected = option;
    this.getAllPorts(option, this.formControlOriginPort);
    this.listLocationsOrigin = [];
  }

  onSelectOptionDestination(option: Location): void {
    this.changeSelectedDestination = true;
    this.lastDestinationSelected = option;
    this.getAllCitiesIncotermStep();
    this.getAllPorts(option, this.formControlDestinationPort);
    this.listLocationsDestination = [];
  }

  // onSelectOptionOrigenPort(option: Port): void {
  //   this.lastPortOriginSelected = option;
  // }

  // onSelectOptionDestinationPort(option: Port): void {
  //   this.lastPortDestinationSelected = option;
  // }

  changeCityIcotermAutocomplete() {

  }

  onSelectOptionCityIcoterm(option: Location) {

  }

  getErrorMessageRequired(formControl: FormControl): string {
    return formControl.hasError('required') ? 'Este campo es requerido' : '';
  }

  actionButtonBack(): void {
    if (this.currentStep > 0) {
      this.currentStep -= 1;
    }
  }

  actionButtonNext(): void {
    if (this.canGoToNextStep()) {
      if (this.currentStep < this.listStepper.length && this.currentStep!=3) {
        this.currentStep += 1;
      }
      else if (this.currentStep < this.listStepper.length && this.currentStep==3){
        let body = {
          container_type_id: this.selectedContainer?.id,
          port_origin_id: this.formControlOriginPort?.value?.id,
          port_destination_id: this.formControlDestinationPort?.value?.id
        }
        this.preloadFinalization=true;
        this.liquidationService.validatePortTarifInternational(body).subscribe(res=>{
          this.currentStep += 1;
          this.preloadFinalization=false;
        }, (error: HttpErrorResponse) => {
          if (error.status===400){
            this.notifyService.showErrorSnapshot('No hay informacion de fletes internacionales con los dos puertos y el tipo de contenedor seleccionados.');
          }
          this.preloadFinalization=false;
        })
      }
    }
  }

  verifyCorrectLiquidation(): void {
    this.preloadFinalization = true;
    const body = {
      container_type_id: this.selectedContainer?.id,
      port_origin_id: this.formControlOriginPort?.value?.id,
      port_destination_id: this.formControlDestinationPort?.value?.id,
      city_destination_id: this.lastSelectedIcotermCity?.id,
      incoterm: this.selectedIncoterm.name
    };
    this.liquidationService.validateInfoPortTarifNational(body).subscribe(res => {
      this.preloadFinalization = false;
      this.openDialogResume();
    }, (error: HttpErrorResponse) => {
      this.preloadFinalization = false;
      if (error.status === 400) {
        this.notifyService.showErrorSnapshot('La liquidación no se puede crear porque no hay informacion de fletes nacionales con la ciudad seleccionada.');
      }
    });
  }

  openDialogResume(): void {
    if (!this.canGoToNextStep()) {
      return;
    }
    const dataImportConst: ImportCost = {
      cityOrigin: this.lastOriginSelected,
      cityDestination: this.lastDestinationSelected,
      currency: this.selectedCurrency,
      container: this.selectedContainer,
      fobValue: this.formControlValueFOB.value,
      incoterm: this.selectedIncoterm,
      portOrigin: this.formControlOriginPort.value,
      portDestination: this.formControlDestinationPort.value,
      product: this.selectedProduct,
    };
    if (!this.disabledFormIcotermType()) {
      dataImportConst.cityIcoterm = this.lastSelectedIcotermCity;
    }
    this.matDialog.open(DialogResumeComponent, {
      width: '600px',
      maxWidth: '96vw',
      height: 'max-content',
      maxHeight: '96vh',
      backdropClass: 'backdrop-dark',
      panelClass: 'div-without-padding',
      data: dataImportConst,
    });
  }

  openDialogHelp(): void {
    this.matDialog.open(DialogHelpComponent, {
      width: '500px',
      maxWidth: '96vw',
      height: '500px',
      maxHeight: '96vh',
      backdropClass: 'backdrop-dark',
      panelClass: 'div-without-padding'
    });
  }

  changeStepOption(i: number): void {
    if (this.canGoToNextStep()) {
      if (i === this.listStepper.length - 1) {
        this.verifyCorrectLiquidation();
      } else {
        this.currentStep = i;
      }
    }
  }

  getErrorMessageFOB(): string {
    return this.formControlValueFOB.hasError('required')
      ? 'Este campo es obligatorio'
      : this.formControlValueFOB.hasError('pattern')
        ? 'Solo números positivos'
        : this.formControlValueFOB.hasError('min')
          ? 'Mínimo 1'
          : '';
  }

  selectIcotermType(incoterm: Incoterm): void {
    this.selectedIncoterm = incoterm;
    this.disabledFormIcotermType();
  }

  disabledFormIcotermType(): boolean {
    if (this.selectedIncoterm !== this.listIncoterm[this.listIncoterm.length - 1]) {
      this.formControlCityIcoterm.disable();
      return true;
    } else {
      this.formControlCityIcoterm.enable();
      return false;
    }
  }

  onSelectOptionIncotermCity(option: Location): void {
    this.lastSelectedIcotermCity = option;
  }

  canGoToNextStep(): boolean {
    if (this.currentStep === 0 && (!this.lastOriginSelected || !this.lastDestinationSelected || this.formControlOriginPort.invalid || this.formControlDestinationPort.invalid)) {
      this.formControlOrigin.markAsTouched();
      this.formControlDestination.markAsTouched();
      this.formControlOriginPort.markAsTouched();
      this.formControlDestinationPort.markAsTouched();
      return false;
    } else if (this.currentStep === 1 && !this.selectedProduct) {
      return false;
    } else if (this.currentStep === 2 && (this.formControlValueFOB.invalid || !this.selectedCurrency)) {
      this.formControlValueFOB.markAsTouched();
      return false;
    } else if (this.currentStep === 3 && !this.selectedContainer) {
      this.formControlValueFOB.markAsTouched();
      return false;
    } else if (this.currentStep === 4 && this.isInvalidIncotermStep()) {
      this.formControlCityIcoterm.markAsTouched();
      return false;
    }
    return true;
  }

  private isInvalidIncotermStep(): boolean {
    return (this.selectedIncoterm && !this.disabledFormIcotermType() && !this.lastSelectedIcotermCity) || !this.selectedIncoterm;
  }

  selectProduct(product){
    if (product.code.length>=13){
      this.selectedProduct = product;
    }
    else{
      Swal.fire(
        'Advertencia',
        'Solo se pueden seleccionar productos que tengan codigo con 13 o mas caracteres.',
        'warning')
    }

  }
  getDescriptionToltip(incoterm): string {
    if(incoterm.name === 'DDP'){
      return 'Entregado con derechos pagados';
    }
    else if(incoterm.name === 'CIF'){
      return 'Costo seguro y flete.';
    }
    else{
      return 'Costo y flete'
    }
  }
}
