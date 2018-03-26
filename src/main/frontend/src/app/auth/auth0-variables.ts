interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
  apiUrl: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'XOgkYhvWQEv3ZR1qVF1oJnqqrmdyNL4g',
  domain: 'riftgaming.auth0.com',
  callbackURL: 'https://go-rift.herokuapp.com//home',
  apiUrl: 'https://riftgaming.auth0.com/api/v2/'
};
