import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class StripePaymentService {
  storeCustomerCardURL = "/api/stripe/storeCustomerCard";

  constructor(private http: Http){}


  storeCustomerCard(data) {
    console.log("storing customer credit card");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.put(this.storeCustomerCardURL, data, options)
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
    return this.http.get("/api/stripe/rifteeStripeId/" + accountId)
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }

  getAllCustomerCards(accountId) {
    return this.http.get("/api/stripe/customerId/" + accountId + "/card")
      .map(
        (response: Response) => {
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
