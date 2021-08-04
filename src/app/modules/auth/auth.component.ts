import {AfterContentChecked, AfterViewInit, Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {SnotifyService} from 'ng-snotify';
import {Utilities} from '../../utils/Utilities';

export const paddingBottom = 16 * 2;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, AfterViewInit, OnDestroy {
  util = Utilities;

  constructor() {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  ngAfterViewInit(): void {
    // (document.getElementsByClassName('img-background')[0] as HTMLElement).style.height = `${document.body.scrollHeight}px`;
  }

  // @HostListener('window:scroll', ['$event']) // for window scroll events
  // onScroll(event): void {
  //   (document.getElementsByClassName('img-background')[0] as HTMLElement).style.height = `${document.body.scrollHeight}px`;
  // }
  //
  // @HostListener('window:resize', ['$event'])
  // onResize(event): void {
  //   (document.getElementsByClassName('img-background')[0] as HTMLElement).style.height = `${document.body.scrollHeight}px`;
  // }
}
