import { RefreshingAuthProvider } from "@twurple/auth";
import { promises as fs } from "fs";
import { getCredentials, getToken } from "./prismaService";
const AuthService = async (isBroadcaster = false) => {
    const { clientId, clientSecret } = (await getCredentials());
    const tokenArray = await getToken(isBroadcaster);
    if (!tokenArray.hasOwnProperty("accessToken")) {
    }
    if (clientId && clientSecret) {
        const authProvider = new RefreshingAuthProvider({
            clientId,
            clientSecret,
        });
        authProvider.onRefresh(async (userId, newTokenData) => await fs.writeFile(`./tokens.${userId}.json`, JSON.stringify(newTokenData, null, 4), "utf-8"));
        // await authProvider.addUserForToken(tokenData)
        return authProvider;
    }
};
export default AuthService;
