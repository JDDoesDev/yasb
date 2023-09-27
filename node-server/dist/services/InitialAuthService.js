import { exchangeCode } from '@twurple/auth';
import { getCredentials } from './prismaService';
export const getTwitchToken = async (body) => {
    console.log(body);
    const { code, scope, state } = body;
    const { clientId, clientSecret } = await getCredentials();
    const tokenData = await exchangeCode(clientId, clientSecret, code, 'http://localhost:5174');
    return tokenData;
};
