export type CredentialBody = {
  clientId: string;
  clientSecret: string;
}

export type TokenBody = {
  accessToken: string;
  refreshToken: string;
  obtainmentTimestamp: number;
  expiresIn: number;
  scope?: string[];
}

export type TwitchAuthInfo = {
  code: string;
  scope?: string;
  state: string;
};
