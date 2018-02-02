import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {UserprofileService} from "../userprofile/userprofile.service";

@Component({
  selector: 'app-therift',
  templateUrl: './therift.component.html',
  styleUrls: ['./therift.component.css']
})
export class TheriftComponent implements OnInit {

  constructor(public auth: AuthService) {
  }

  ngOnInit() {
  }

}
