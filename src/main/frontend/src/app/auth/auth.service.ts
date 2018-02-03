import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from './auth0-variables';
import { Router } from '@angular/router';
import Auth0Lock from 'auth0-lock';
import {Http} from "@angular/http";
import {AppComponent} from "../app.component";

@Injectable()
export class AuthService {

  private createUser = "/user/createUser";

  lock = new Auth0Lock(AUTH_CONFIG.clientID, AUTH_CONFIG.domain, {
    autoclose: true,
    auth: {
      redirectUrl: AUTH_CONFIG.callbackURL,
      responseType: 'token id_token',
      audience: `https://${AUTH_CONFIG.domain}/userinfo`,
      params: {
        scope: 'profile openid email user_metadata'
      }
    },
    additionalSignUpFields: [
      {
        name: "firstName",
        placeholder: "Enter your first name",
      },
      {
        name: "lastName",
        placeholder: "Enter your last name"
      }]
  });

  constructor(public router: Router, private http: Http) {

  }

  public login(): void {
    this.lock.show();
  }

  // Call this method in app.component.ts
  // if using path-based routing
  public handleAuthentication(callback): void {
    this.lock.on('authenticated', (authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult, function () {
          var profileJson = localStorage.getItem('profile');
          var profileJsonParse = JSON.parse(profileJson);
          if (!profileJsonParse.hasOwnProperty("http://riftgaming:auth0:com/app_metadata")) {
            let data = {
              "firstName" : profileJsonParse["http://riftgaming:auth0:com/user_metadata"].firstName,
              "lastName" : profileJsonParse["http://riftgaming:auth0:com/user_metadata"].lastName,
              "riftTag" : profileJsonParse.nickname,
              "auth0Id" : profileJsonParse.sub
            };
            callback(data, true);
          } else {
            callback("", false);
          }
        });
        this.router.navigate(['/']);
      }
    });
    this.lock.on('authorization_error', (err) => {
      this.router.navigate(['/']);
      console.log(err);
      alert(`Error: ${err.error}. Check the console for further details.`);
    });
  }

  private setSession(authResult, callback): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
     this.lock.getUserInfo(authResult.accessToken, function(error, profile, http : Http) {
      if (error) {
        throw new Error(error);
      }
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
      localStorage.setItem('profile', JSON.stringify(profile));
      callback(http);
    })
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time

    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

}
