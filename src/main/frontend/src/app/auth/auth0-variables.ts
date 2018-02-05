interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'XOgkYhvWQEv3ZR1qVF1oJnqqrmdyNL4g',
  domain: 'riftgaming.auth0.com',
  callbackURL: 'http://localhost:4200/therift'
};