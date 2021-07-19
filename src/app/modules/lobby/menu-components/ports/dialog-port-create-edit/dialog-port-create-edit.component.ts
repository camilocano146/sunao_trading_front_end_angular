import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {FormControl, Validators} from '@angular/forms';
import {NotifyService} from '../../../../../services/notify/notify.service';
import {HttpErrorResponse} from '@angular/common/http';

import { ConstantsApp } from '../../../../../utils/ConstantsApp';
import { PortsComponent } from '../ports.component';
import { DataDialogPort } from '../ports.component';
import { ProductsService } from 'src/app/services/products/products.service';
import { Port } from 'src/app/models/Port';
import { PortsService } from 'src/app/services/ports/ports.service';
import { LocationService } from 'src/app/services/location/location.service';
import { Location } from 'src/app/models/Location';
import {AppComponent} from '../../../../../app.component';

@Component({
  selector: 'app-dialog-port-create-edit',
  templateUrl: './dialog-port-create-edit.component.html',
  styleUrls: ['./dialog-port-create-edit.component.scss']
})
export class DialogPortCreateEditComponent implements OnInit {


  public preload: boolean;
  public preloadSave: boolean;
  maxLengthName = 100;

  public list_countries: Location[] = [];
  public formControlName: FormControl = new FormControl(
    null, [Validators.required, Validators.minLength(3), Validators.maxLength(this.maxLengthName)]
  );

  public formControlAddress: FormControl = new FormControl(
    null, [Validators.required, Validators.minLength(3), Validators.maxLength(this.maxLengthName)]
  );

  // public formControlLatitud: FormControl = new FormControl(
  //   null, [Validators.required,  Validators.maxLength(this.maxLengthName)]
  // );
  // public formControlLongitud: FormControl = new FormControl(
  //   null, [Validators.required,  Validators.maxLength(this.maxLengthName)]
  // );
  //
  public formControlLocation: FormControl = new FormControl(
    null, [Validators.required, Validators.maxLength(this.maxLengthName)]
  );
  longitude = 0;
  latitude = 0;
  constants = ConstantsApp;
  private timer: any;

  constructor(
    private portsService: PortsService,
    private locationService: LocationService,
    public dialogRef: MatDialogRef<DialogPortCreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialogPort,
    private translate: TranslateService,
    private notifyService: NotifyService,
  ) {
    this.preload = true;
    this.locationService.getAllCountries(0, 30, '').subscribe(res => {
      this.list_countries = res.results;
      if (this.data.dataEdit) {
        this.formControlName.setValue(data.dataEdit.name);
        this.formControlAddress.setValue(data.dataEdit.address);
        // this.formControlLatitud.setValue(data.dataEdit.latitude);
        // this.formControlLongitud.setValue(data.dataEdit.longitude);
        this.formControlLocation.setValue(data.dataEdit.location.id);
        this.latitude = +data.dataEdit.latitude;
        this.longitude = +data.dataEdit.longitude;
      }
      this.preload = false;
    });
  }

  saveOrEdit(): void {
    if (this.formControlName.valid && this.formControlAddress.valid && this.formControlLocation.valid && this.havePosition()) {
      this.preloadSave = true;
      const body: Port = {
        name: this.formControlName.value,
        address: this.formControlAddress.value,
        location_id : this.formControlLocation.value,
        latitude: +this.latitude,
        longitude : +this.longitude,
      };
      let observable;
      if (this.data.dataEdit) {
        observable = this.portsService.edit(this.data.dataEdit.id, body);
      } else {
        observable = this.portsService.register(body);
      }
      observable.subscribe(res => {
        this.preloadSave = false;
        this.notifyService.showSuccessCreateOrEdit(!!this.data.dataEdit);
        this.dialogRef.close('created');
      }, (error: HttpErrorResponse) => {
        const errors = error.error.body?.mensaje?.errors;
        if (errors?.name?.message?.toString()?.toUpperCase()?.includes('name must be unique'.toUpperCase())) {
          this.notifyService.showErrorSnapshot(this.translate.instant('errors.unique_name'));
        } else {
          this.notifyService.showErrorSnapshot(this.translate.instant('errors.connection_error'));
        }
        this.preloadSave = false;
      });
    } else {
      this.formControlName.markAsTouched();
      this.formControlAddress.markAsTouched();
      this.formControlLocation.markAsTouched();
    }
  }

  ngOnInit(): void {

  }

  searchSelectorCities(event): void {
    if (this.timer) {
      window.clearTimeout(this.timer);
    }
    this.timer = window.setTimeout(() => {
      this.list_countries = [];
      this.locationService.getAllCountries(0, 10, event.path[0].value).subscribe(res => {
        this.list_countries = res.results;
      });
    }, AppComponent.timeMillisDelayFilter);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  chooseMatPoint(event: MouseEvent): void {
    // @ts-ignore
    const coordinates = event.coords;
    this.latitude = coordinates.lat.toFixed(ConstantsApp.maxFixedCoordinates);
    this.longitude = coordinates.lng.toFixed(ConstantsApp.maxFixedCoordinates);
  }

  havePosition(): boolean {
    // tslint:disable-next-line:triple-equals
    return this.latitude != 0 && this.longitude != 0;
  }
}
