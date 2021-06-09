import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Location} from '../../../models/Location';
import {Container} from '../../../models/Container';
import {MatDialog} from '@angular/material/dialog';
import {DialogResumeComponent} from './dialog-resume/dialog-resume.component';
import {DialogHelpComponent} from './dialog-help/dialog-help.component';
import {DialogLoginComponent} from './dialog-login/dialog-login.component';

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
  listStepper: Step[] = [
    {imagePath: './assets/import/menu/location.svg', name: 'Origen Destino'},
    {imagePath: './assets/import/menu/clipboard.svg', name: 'Producto o partida aracelaria'},
    {imagePath: './assets/import/menu/money.svg', name: 'FOB Divisa'},
    {imagePath: './assets/import/menu/worldwide-shipping.svg', name: 'Contenedor'},
    {imagePath: './assets/import/menu/internet.svg', name: 'Incoterm'},
    {imagePath: './assets/import/menu/cheque.svg', name: 'Liquidar'},
  ];
  formControlOrigin: FormControl = new FormControl('', [Validators.required]);
  lastOriginSelected: Location;
  lastDestinationSelected: Location;
  lastPortOriginSelected: Location;
  lastPortDestinationSelected: Location;
  listLocations: Location[] = [
    {name: 'Malaga'},
    {name: 'Pontevedra'},
    {name: 'Sevilla'},
  ];
  currentStep = 4;
  formControlProductName: FormControl = new FormControl('', [Validators.required]);
  formControlTariffHeading: FormControl = new FormControl('', [Validators.required]);
  listProductOrTariff = [
    {name: 'asd', value: 13712123},
  ];
  listCurrencies: Currency[] = [
    {name: 'Euro', abbreviation: 'EUR', imageCountry: './assets/logos/logo-colors.png'},
    {name: 'Euro', abbreviation: 'EUR', imageCountry: './assets/logos/logo-colors.png'},
    {name: 'Euro', abbreviation: 'EUR', imageCountry: './assets/logos/logo-colors.png'},
    {name: 'Euro', abbreviation: 'EUR', imageCountry: './assets/logos/logo-colors.png'},
  ];
  listContainers: Container[] = [
    {name: 'Euro'},
    {name: 'Euro'},
    {name: 'Euro'},
  ];
  formControlCityIcoterm: FormControl = new FormControl('', [Validators.required]);
  lastCityIcotermSelected: Location;
  incotermCostSelected: number;

  constructor(
    public matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log(this.currentStep);
    this.openDialogLogin();
  }

  changeOriginAutocomplete() {

  }

  onSelectOptionOrigin(option: Location) {

  }

  changeCityIcotermAutocomplete() {

  }

  onSelectOptionCityIcoterm(option: Location) {

  }

  getErrorMessageLocation(formControlOrigin: FormControl) {

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
