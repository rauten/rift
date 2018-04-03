import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class StripePaymentService {
  storeCustomerCardURL = "/api/stripe/storeCustomerCard";

  constructor(private http: Http){}


  storeCustomerCard(data) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.storeCustomerCardURL, data, options)
      .map((response: Response) =>
        {
          return response.json();
        }
      )
      .catch((error:any) => Observable.throw(error.json().error || 'Serve error'));
  }
}
