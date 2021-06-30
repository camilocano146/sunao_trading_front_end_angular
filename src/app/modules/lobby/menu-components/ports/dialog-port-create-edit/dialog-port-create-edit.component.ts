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

@Component({
  selector: 'app-dialog-port-create-edit',
  templateUrl: './dialog-port-create-edit.component.html',
  styleUrls: ['./dialog-port-create-edit.component.scss']
})
export class DialogPortCreateEditComponent implements OnInit {


  public preload: boolean;
  public preloadSave: boolean;
  maxLengthName = 100;
  
  public list_cities : Location[]=[]
  public formControlName: FormControl = new FormControl(
    null, [Validators.required, Validators.minLength(3), Validators.maxLength(this.maxLengthName)]
  );

  public formControlAddress: FormControl = new FormControl(
    null, [Validators.required, Validators.minLength(3), Validators.maxLength(this.maxLengthName)]
  );
  
  public formControlLatitud: FormControl = new FormControl(
    null, [Validators.required,  Validators.maxLength(this.maxLengthName)]
  );
  public formControlLongitud: FormControl = new FormControl(
    null, [Validators.required,  Validators.maxLength(this.maxLengthName)]
  );
  
  public formControlLocation: FormControl = new FormControl(
    null, [  Validators.maxLength(this.maxLengthName)]
  );
  constructor(
    private portsService: PortsService,
    private locationService: LocationService,
    public dialogRef: MatDialogRef<DialogPortCreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialogPort,
    private translate: TranslateService,
    private notifyService: NotifyService,
  ) {
    
    this.preload=true;

    this.locationService.getAllCities(0, 30).subscribe(res=>{
      
      this.list_cities=res.results;
      if (this.data.dataEdit) {
        this.formControlName.setValue(data.dataEdit.name);
        this.formControlAddress.setValue(data.dataEdit.address)
        this.formControlLatitud.setValue(data.dataEdit.latitud);
        this.formControlLongitud.setValue(data.dataEdit.longitud);
        this.formControlLocation.setValue(data.dataEdit.location.id);
      }
      this.preload= false;
    });

  }

  saveOrEdit(): void {
    if (this.formControlName.valid) {
      this.preloadSave = true;
      const body: Port = {
        name: this.formControlName.value,
        address: this.formControlAddress.value,
        latitud: this.formControlLatitud.value,
        longitud : this.formControlLongitud.value,
        location_id : this.formControlLocation.value.id,
        
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
    }
  }

  ngOnInit(): void {
    
  }

  searchSelectorCities(event){

    if(event.path[0].value.length>5){
      this.list_cities=[];
      this.locationService.getAllCities(0, 10, event.path[0].value).subscribe(res=>{
        this.list_cities=res.results;
      })
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
