import {Component, Inject, NgZone, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";
import {StripePaymentService} from "./stripe-payment.service";

@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.component.html',
  styleUrls: ['./stripe-payment.component.scss']
})
export class StripePaymentComponent implements OnInit {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;

  message: string;

  ngOnInit() {
  }

  constructor(private _zone: NgZone, @Inject(MAT_DIALOG_DATA) public data, private stripeService: StripePaymentService) {}

  getToken() {
    this.message = 'Loading...';

    (<any>window).Stripe.card.createToken({
      number: this.cardNumber,
      exp_month: this.expiryMonth,
      exp_year: this.expiryYear,
      cvc: this.cvc
    }, (status: number, response: any) => {
      // Wrapping inside the Angular zone
      this._zone.run(() => {
        if (status === 200) {
          this.message = `Success! Card token ${response.card.id}.`;
          let data = {
            "customerId": this.data.customerId,
            "token": "tok_visa"
            // "token": response.card.id
          };
          console.log(data);
          this.stripeService.storeCustomerCard(data);
        } else {
          this.message = response.error.message;
        }
      });
    });
    console.log("hello got token");
  }


}
