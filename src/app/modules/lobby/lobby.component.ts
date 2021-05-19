import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/User';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  private static readonly limitNotification: number = 10;
  user: User;
  imgUrl: string;
  isAdminUser: boolean;
  unseenNotifications: number;
  preloadNotifications: boolean;
  public loadingMoreNotifications: boolean;
  public pageIndexCurrent: number;
  public notMoreMessagesForLoad: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
  }

  logOut(): void {
    this.router.navigate(['']);
    localStorage.clear();
  }

  isMobileScreen(): boolean {
    return window.screen.width <= 600;
  }

  isSelectOption(value: string): boolean {
    return this.router.url.endsWith(value);
  }

  goToDashboard(): void {
    this.router.navigate(['/lobby']);
  }
}
