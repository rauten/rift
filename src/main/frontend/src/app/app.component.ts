import { Component, OnInit } from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {Http} from "@angular/http";
import {UserprofileService} from "./userprofile/userprofile.service";
import {Userprofile} from "./models/userprofile";
import {PaymentService} from "./userprofile/payment.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public auth: AuthService, private userprofileService: UserprofileService,
  private paymentService: PaymentService) {
    auth.handleAuthentication(function (data, createUser) {
      if (createUser) {
        let btData = {
          "firstName": data.firstName,
          "lastName": data.lastName
        };
        paymentService.createBraintreeUser(btData).subscribe(
          resBody => {
            var braintreeId = resBody.customerId;
            let riftData = {
              "firstName": data.firstName,
              "lastName": data.lastName,
              "riftTag": data.riftTag,
              "auth0Token": data.auth0Token,
              "braintreeId": braintreeId,
              "email": data.email
            };
            userprofileService.createUser(riftData);
          }
        );
      } else {
        var profile = JSON.parse(localStorage.getItem("profile"));
        userprofileService.getUser(profile.nickname).subscribe(
          resBody => {
            localStorage.setItem("loggedInUserID", resBody.id.toString());
            console.log(localStorage.getItem("loggedInUserID"));
          })
      }
    });
  }
}

