export type TwitchAuthInfo = {
  code: string;
  scope?: string;
  state?: string;
}

export type CredentialBody = {
  clientId: string;
  clientSecret: string;
}
