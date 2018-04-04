import {Component, Inject, NgZone, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material";
import {StripePaymentService} from "./stripe-payment.service";
import {AddBankAccountComponent} from "./legal-bank-account-info/add-bank-account/add-bank-account.component";
import {ViewCardsComponent} from "./view-cards/view-cards.component";

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

  constructor(private _zone: NgZone, @Inject(MAT_DIALOG_DATA) public data, private stripeService: StripePaymentService,
              private dialog: MatDialog) {}

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
          console.log(response);
          let data = {
            "customerId": this.data.customerId,
            // "token": "tok_visa"
            "token": response.id
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

  viewCards() {
    this.dialog.open(ViewCardsComponent, {
      height: '450px',
      width: '600px',
      data: {
        "customerId": this.data.customerId
      }
    });
  }


}
