import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ManageLocalStorage } from 'src/app/utils/ManageLocalStorage';
import {Utilities} from '../../utils/Utilities';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

  public tokenActive: boolean;
  util = Utilities;

  constructor(
    private router: Router
  ) {
    this.tokenActive = ManageLocalStorage.getToken() != null;
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
