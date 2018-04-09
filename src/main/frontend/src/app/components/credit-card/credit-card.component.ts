import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {CreditCard} from "../../models/credit-card";
import {StripePaymentService} from "../../userprofile/stripe-payment/stripe-payment.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap";

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit {
  @Input() creditCard: CreditCard;
  @Input() customerId: any;
  modalRef: BsModalRef;

  constructor(private stripeService: StripePaymentService, private modalService: BsModalService) {
  }

  ngOnInit() {
  }

  setAsDefault() {
    this.stripeService.setCardAsDefault(this.creditCard.id, this.customerId);
  }

  deleteCard() {
    this.stripeService.deleteCustomerCreditCard(this.creditCard.id, this.customerId)
  }

  changeStatus(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}

