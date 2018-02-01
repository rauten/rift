import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from './auth0-variables';
import { Router, NavigationStart } from '@angular/router';
import Auth0Lock from 'auth0-lock';


@Injectable()
export class AuthService {

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
    additionalSignUpFields: [{
      name: "address",
      placeholder: "enter your address",
      // The following properties are optional
      icon: "https://example.com/assests/address_icon.png",
      prefill: "street 123",
      validator: function(address) {
        return {
          valid: address.length >= 10,
          hint: "Must have 10 or more chars" // optional
        };
      }
    },
      {
        name: "full_name",
        placeholder: "Enter your full name"
      }]
  });

  constructor(public router: Router) {

  }

  public login(): void {
    this.lock.show();
  }

  // Call this method in app.component.ts
  // if using path-based routing
  public handleAuthentication(): void {
    this.lock.on('authenticated', (authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.router.navigate(['/']);
      }
    });
    this.lock.on('authorization_error', (err) => {
      this.router.navigate(['/']);
      console.log(err);
      alert(`Error: ${err.error}. Check the console for further details.`);
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    console.log(authResult);
    this.lock.getUserInfo(authResult.accessToken, function(error, profile) {
      if (error) {
        throw new Error(error);
      }
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
      localStorage.setItem('profile', JSON.stringify(profile));
      console.log(localStorage.getItem('profile'));
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
