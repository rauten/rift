import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class StripePaymentService {
  storeCustomerCardURL = "/api/stripe/storeCustomerCard";

  constructor(private http: Http){}


  storeCustomerCard(data) {
    console.log("storing credit card");
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

  storeMerchantBankAccount(data, id) {
    console.log("storing credit card");
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put("/api/stripe/user/" + id + "/storeMerchantBankAccount", data, options)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Serve error'))

  }
}
