import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-register-quiz',
  templateUrl: './dialog-register-quiz.component.html',
  styleUrls: ['./dialog-register-quiz.component.scss']
})
export class DialogRegisterQuizComponent implements OnInit {

  listConfirmOptions: string[] = ['Si', 'No'];
  selected:number=0;
  listOperationsType: string[] = ['Importa', 'Exporta', 'Importa y exporta'];
  listQuantities:string[] = ['De 0 a 100 toneladas por año.', 'De 101 a 500 toneladas por año.', 'Mas de 501 toneladas por año.']
  
  public formConfirmOption:FormControl;
  public formOperationsType:FormControl;
  public formQuantities:FormControl;

  isClickedSave:boolean=false;
  
  constructor(
    public dialogRef: MatDialogRef<DialogRegisterQuizComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) { 

    this.formConfirmOption= new FormControl('',[Validators.required]);
    this.formOperationsType= new FormControl('');
    this.formQuantities = new FormControl('');
  }

  ngOnInit(): void {
  }

  
  /*checkbox change event*/
  onChange(e,event) {
    
    this.formConfirmOption.setValue(e.checked ? event : null );
    
    if(this.formConfirmOption.value==0){
      this.formOperationsType.setValidators([Validators.required]);
      this.formQuantities.setValidators([Validators.required]);
      this.formOperationsType.setValue(null);
      this.formQuantities.setValue(null);
    }
    else{
      this.formQuantities.setValidators([]);
      this.formOperationsType.setValidators([]);
      this.formOperationsType.setValue(null);
      this.formQuantities.setValue(null);
      
    }    
  }

  onChangeOperationsType(e,event){
    this.formOperationsType.setValue(e.checked ? event : null);
  }

  onChangeQuantities(e,event){
    this.formQuantities.setValue(e.checked ? event : null);
  }

  save(){
    this.isClickedSave= true;
    if(this.formConfirmOption.valid){
      if(this.formConfirmOption.value==0 && (this.formOperationsType.value===null || this.formQuantities.value===null)){
        this.formOperationsType.markAsTouched();
        this.formQuantities.markAsTouched();
        
      }else{
        let data ={
          "1":this.formConfirmOption.value,
          "2":this.formOperationsType.value,
          "3":this.formQuantities.value
        }
        this.dialogRef.close(data);
      }
    }
    else{
      this.formConfirmOption.markAsTouched();
    }
  }

}
