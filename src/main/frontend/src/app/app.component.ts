import { Component } from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {Http} from "@angular/http";
import {UserprofileService} from "./userprofile/userprofile.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public auth: AuthService, private userprofileService: UserprofileService) {
    auth.handleAuthentication(function (data, createUser) {
      if (createUser) {
        userprofileService.createUser(data);
      }
    });
  }
}

/*
let data = {
  "firstName": firstName,
  "lastName": lastName,
  "riftTag": riftTag,
  "auth0Id": auth0Id
};
let body = JSON.stringify(data);
let head = new Headers({
  'Content-Type': 'application/json'
});
this.http.post(this.createUserURL, body, {headers : head})
  .map(res =>  res.json())
  .subscribe(
    data => {console.log(data);},
    err => console.log(err),
    () => console.log('Created user')
  );
 */
