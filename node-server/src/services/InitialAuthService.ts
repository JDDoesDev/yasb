import { exchangeCode } from '@twurple/auth';
import { CredentialBody, TwitchAuthInfo } from '../types/Credentials.types';
import { getCredentials } from './prismaService';


export const getTwitchToken = async (body: TwitchAuthInfo) => {
  console.log(body);
  const { code, scope, state } = body;
  const { clientId, clientSecret } = await getCredentials() as CredentialBody;
  const tokenData = await exchangeCode(
    clientId,
    clientSecret,
    code,
    'http://localhost:5174',
  )
  return tokenData;
}
