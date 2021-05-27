import { Component, OnInit } from '@angular/core';
import {User} from '../../../../models/User';
import {ManageLocalStorage} from '../../../../utils/ManageLocalStorage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor() {
    this.user = ManageLocalStorage.getUser();
  }

  ngOnInit(): void {
  }

}
