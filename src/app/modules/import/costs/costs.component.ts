import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Location} from '../../../models/Location';
import {Container} from '../../../models/Container';

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
  listLocations: Location[] = [
    {name: 'Malaga'},
    {name: 'Pontevedra'},
    {name: 'Sevilla'},
  ];
  currentStep = 3;
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

  constructor() { }

  ngOnInit(): void {
    console.log(this.currentStep);
  }

  changeOriginAutocomplete() {

  }

  onSelectOptionOrigin(option: Location) {

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
}
