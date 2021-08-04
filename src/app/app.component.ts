import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Utilities} from './utils/Utilities';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  static readonly timeMillisDelayFilter: number = 300;
  static readonly pageSizeOptions: number[] = [50, 100];
  title = 'sunao-angular';
  util = Utilities;

  constructor(private translate: TranslateService) {
    const current = this.translate.getBrowserLang();
    if (current === 'en') {
      this.translate.use('en');
    } else if (current === 'es') {
      this.translate.use('es');
    } else {
      this.translate.use('en');
    }
  }
}
