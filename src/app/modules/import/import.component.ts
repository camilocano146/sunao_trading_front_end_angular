import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { ManageLocalStorage } from 'src/app/utils/ManageLocalStorage';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

  
  public tokenActive:Boolean;
  constructor(
    private router: Router
  ) { 
    this.tokenActive= ManageLocalStorage.getToken()==null? false: true;
  }

  ngOnInit(): void {
  }

  goToHome(): void {
    this.router.navigate(['lobby']);
  }

  goToLiquidations(): void {
    this.router.navigate(['']);
  }
}
