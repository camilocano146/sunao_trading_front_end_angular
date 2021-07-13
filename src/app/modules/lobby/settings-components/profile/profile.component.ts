import { Component, OnInit } from '@angular/core';
import {User} from '../../../../models/User';
import {ManageLocalStorage} from '../../../../utils/ManageLocalStorage';
import {UserService} from '../../../../services/user/user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  preload: boolean;

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
    this.user = ManageLocalStorage.getUser();

    this.preload = true;
    this.userService.getUser().subscribe(res => {
      this.user = res;
      this.preload = false;
    }, error => {
      this.preload = false;
    });
  }

  ngOnInit(): void {
  }

  verifyAccount(): void {
    if (!this.user.isActive) {
      window.open('/#/activate-account');
      // this.router.navigate(['']);
    }
  }
}
