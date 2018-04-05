import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class StripePaymentService {
  storeCustomerCardURL = "/api/stripe/storeCustomerCard/setDefault=";

  constructor(private http: Http){}


  storeCustomerCard(data, isDefault) {
    console.log("storing customer credit card");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.put(this.storeCustomerCardURL + isDefault, data, options)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Serve error'))
      .subscribe(
        data => {console.log(data);},
        err => console.log(err),
        () => console.log("Stored credit card")
      );
  }

  getAccountId(data, id) {
    console.log("getting account token");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put("/api/stripe/user/" + id + "/getMerchantAccountToken", data, options)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Serve error'))
  }

  storeMerchantBankAccount(data, id) {
    console.log("storing merchant bank account");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.put("/api/stripe/user/" + id + "/storeMerchantBankAccount", data, options)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Serve error'))
      .subscribe(
        data => {console.log(data);},
        err => console.log(err),
        () => console.log("Stored bank account")
      );
  }

  getCustomerDefaultCard(accountId) {
    return this.http.get("/api/stripe/getDefaultCard/" + accountId)
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }

  getAllCustomerCards(accountId) {
    return this.http.get("/api/stripe/getCustomerCards/" + accountId)
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  setCardAsDefault(cardId, customerId) {
    console.log("Changing card to default card");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.put("/api/stripe/setDefaultCard/" + cardId + "/cardOwner/" + customerId, options)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Serve error'))
      .subscribe(
        data => {console.log(data);},
        err => console.log(err),
        () => console.log("Set new default card")
      );
  }

  deleteCustomerCreditCard(cardId, customerId) {
    console.log("Deleting credit card for customer");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.delete("/api/stripe/deleteCustomerCreditCard/" + cardId + "/cardOwner/" + customerId, options)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Serve error'))
      .subscribe(
        data => {console.log(data);},
        err => console.log(err),
        () => console.log("Deleted customer credit card")
      );
  }

  createTransaction(data, customerId, accountId) {
    console.log("Creating transaction");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.put("/api/stripe/createTransaction/bankAccount/" + accountId + "/customerId/" + customerId, data, options)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Serve error'))
      .subscribe(
        data => {console.log(data);},
        err => console.log(err),
        () => console.log("Transaction completed")
      );
  }


}
