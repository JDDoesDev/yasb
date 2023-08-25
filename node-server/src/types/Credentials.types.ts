export type CredentialBody = {
  clientId?: string;
  clientSecret?: string;
}

export type TokenBody = {
  id: number;
  userId: number;
  isBroadcaster: boolean;
  accessToken: string;
  refreshToken: string;
  obtainmentTimestamp: number;
  expiresIn: number;
  scope: string;
}
