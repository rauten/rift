import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";
import {StripePaymentService} from "../stripe-payment.service";

@Component({
  selector: 'app-legal-bank-account-info',
  templateUrl: './legal-bank-account-info.component.html',
  styleUrls: ['./legal-bank-account-info.component.scss']
})
export class LegalBankAccountInfoComponent implements OnInit {
  message: string;

  country: string;
  city: string;
  addressLine1: string;
  addressLine2: string;
  zipCode: string;
  state: string;
  dobDay: string;
  dobMonth: string;
  dobYear: string;
  firstName: string;
  lastName: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data, private stripeService: StripePaymentService) { }

  ngOnInit() {
  }

  getToken() {
    let data = {
      "country": this.country,
      "city": this.city,
      "addressLine1": this.addressLine1,
      "addressLine2": this.addressLine2,
      "zipCode": this.zipCode,
      "state": this.state,
      "dobDay": this.dobDay,
      "dobMonth": this.dobMonth,
      "dobYear": this.dobYear,
      "firstName": this.firstName,
      "lastName": this.lastName
    };
    let id = this.data.riftId;
    this.stripeService.storeMerchantBankAccount(data, id).subscribe(
      resBody => {
        let accountId = resBody.accountId;
        console.log(accountId);
      }
    )

  }

}
