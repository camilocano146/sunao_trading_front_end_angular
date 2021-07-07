import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Location} from '../../../models/Location';
import {Container} from '../../../models/Container';
import {MatDialog} from '@angular/material/dialog';
import {DialogResumeComponent} from './dialog-resume/dialog-resume.component';
import {DialogHelpComponent} from './dialog-help/dialog-help.component';
import {DialogLoginComponent} from './dialog-login/dialog-login.component';
import {Port} from '../../../models/Port';
import {LocationService} from '../../../services/location/location.service';
import {PortsService} from '../../../services/ports/ports.service';
import {AppComponent} from '../../../app.component';
import {Observable, Subscription} from 'rxjs';
import {ContainerService} from '../../../services/container/container.service';

interface Step {
  imagePath: string;
  name: string;
}

interface Currency {
  name: string;
  abbreviation: string;
  imageCountry: string;
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
  lastPortOriginSelected: Port;
  lastPortDestinationSelected: Port;
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
  formControlProductName: FormControl = new FormControl('', [Validators.required]);
  formControlTariffHeading: FormControl = new FormControl('', [Validators.required]);
  listProductOrTariff = [
    {name: 'asd', value: 13712123},
  ];
  listCurrencies: Currency[] = [
    {name: 'Euro', abbreviation: 'EUR', imageCountry: './assets/flags/union-europea.svg'},
    {name: 'Dolar', abbreviation: 'USD', imageCountry: './assets/flags/estados-unidos.svg'},
    {name: 'Libra', abbreviation: 'GBP', imageCountry: './assets/flags/reino-unido.svg'},
    {name: 'Peso', abbreviation: 'COP', imageCountry: './assets/flags/colombia.svg'},
  ];
  listContainers: Container[] = [
    {name: 'Euro'},
    {name: 'Euro'},
    {name: 'Euro'},
  ];
  formControlCityIcoterm: FormControl = new FormControl('', [Validators.required]);
  lastCityIcotermSelected: Location;
  incotermCostSelected: number;
  private timer: number;
  private listSubscribesLocation: Subscription[] = [];
  defaultLatitude = 0;
  defaultLongitude = 0;

  constructor(
    public matDialog: MatDialog,
    public locationService: LocationService,
    public portsService: PortsService,
    public containerService: ContainerService,
  ) { }

  ngOnInit(): void {
    console.log(this.currentStep);
    // this.openDialogLogin();

    this.getAllCities(this.formControlOrigin, true);
    this.getAllCities(this.formControlDestination, true);
    this.getContaiters();
  }

  getContaiters(): void {
    this.containerService.getAll(0, this.limitContainers).subscribe(value => {
      this.listContainers = value.results;
      console.log(this.listContainers);
    });
  }

  getAllCities(formControl: FormControl, onInit?: boolean): void {
    if (formControl === this.formControlOrigin && this.lastOriginSelected?.name?.toUpperCase() !== this.formControlOrigin?.value?.toUpperCase()) {
      this.lastOriginSelected = undefined;
    } else if (formControl === this.formControlDestination && this.lastDestinationSelected?.name?.toUpperCase() !== this.formControlDestination?.value?.toUpperCase()) {
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
      this.listSubscribesLocation.splice(0, this.listSubscribesLocation.length);
      const subscribeLocation = this.locationService.getPublicAllCities(0, this.limit, formControl.value);
      this.listSubscribesLocation.push(subscribeLocation.subscribe(res => {
        // console.log(res);
        if (formControl === this.formControlOrigin) {
          this.listLocationsOrigin = res.results;
        } else {
          this.listLocationsDestination = res.results;
        }
      }, error => {
      }));
    }, AppComponent.timeMillisDelayFilter);
  }

  getAllPorts(city: Location, formControl: FormControl): void {
    if (formControl === this.formControlOriginPort && this.lastPortOriginSelected?.name?.toUpperCase() !== this.formControlOriginPort?.value?.toUpperCase()) {
      this.lastPortOriginSelected = undefined;
    } else if (formControl === this.formControlDestinationPort && this.lastPortDestinationSelected?.name?.toUpperCase() !== this.formControlDestinationPort?.value?.toUpperCase()) {
      this.lastPortDestinationSelected = undefined;
    }
    if (formControl === this.formControlOriginPort && this.lastPortOriginSelected || formControl === this.formControlDestinationPort && this.lastPortDestinationSelected) {
      return;
    }
    if (this.timer) {
      window.clearTimeout(this.timer);
    }
    this.timer = window.setTimeout(() => {
      for (const subscribeL of this.listSubscribesLocation) {
        subscribeL.unsubscribe();
      }
      this.listSubscribesLocation.splice(0, this.listSubscribesLocation.length);
      const subscribeLocation = this.portsService.getPublicListPorts(city.id, 0, this.limit, formControl.value);
      this.listSubscribesLocation.push(subscribeLocation.subscribe(res => {
        // console.log(res);
        if (formControl === this.formControlOriginPort) {
          this.listPortsOrigin = res.results;
        } else {
          this.listPortsDestination = res.results;
        }
      }, error => {
      }));
    }, AppComponent.timeMillisDelayFilter);
  }

  // http://localhost:8000/api/v1/continer_type_no_auth/?offset=0&limit=5

  changeOriginAutocomplete(formControl: FormControl): void {

  }

  onSelectOptionOrigin(option: Location): void {
    this.lastOriginSelected = option;
    this.getAllPorts(option, this.formControlOriginPort);
  }

  onSelectOptionDestination(option: Location): void {
    this.lastDestinationSelected = option;
    this.getAllPorts(option, this.formControlDestinationPort);
  }

  onSelectOptionOrigenPort(option: Port): void {
    this.lastPortOriginSelected = option;
  }

  onSelectOptionDestinationPort(option: Port): void {
    this.lastPortDestinationSelected = option;
    console.log(this.lastPortDestinationSelected);
  }

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
    if (this.currentStep < this.listStepper.length) {
      this.currentStep += 1;
    }
  }

  openDialogResume(): void {
    this.matDialog.open(DialogResumeComponent, {
      width: '500px',
      maxWidth: '96vw',
      height: '500px',
      maxHeight: '96vh',
      backdropClass: 'backdrop-dark',
      panelClass: 'div-without-padding'
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

  openDialogLogin(): void {
    this.matDialog.open(DialogLoginComponent, {
      width: '350px',
      maxHeight: '96vh',
      backdropClass: 'backdrop-dark',
      panelClass: 'div-without-padding'
    });
  }

  changeStepOption(i: number): void {
    if (i === this.listStepper.length - 1) {
      this.openDialogResume();
    } else {
      this.currentStep = i;
    }
  }
}
