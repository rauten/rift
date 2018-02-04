import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currUser: any;
  constructor(public auth: AuthService) {
    this.currUser = JSON.parse(localStorage.getItem('profile'));
  }

  ngOnInit() {
  }

}
