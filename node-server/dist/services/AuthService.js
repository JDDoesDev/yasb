import { RefreshingAuthProvider } from "@twurple/auth";
import { promises as fs } from "fs";
import { getCredentials, getToken } from "./prismaService";
const AuthService = async (isBroadcaster = false) => {
    const { clientId, clientSecret } = (await getCredentials());
    const tokenArray = await getToken(isBroadcaster);
    const tokenData = JSON.parse(await fs.readFile("./tokens/tokens.911278001.json", "utf-8"));
    if (clientId && clientSecret) {
        const authProvider = new RefreshingAuthProvider({
            clientId,
            clientSecret,
        });
        authProvider.onRefresh(async (userId, newTokenData) => await fs.writeFile(`./tokens.${userId}.json`, JSON.stringify(newTokenData, null, 4), "utf-8"));
        await authProvider.addUserForToken(tokenData);
        return authProvider;
    }
};
export default AuthService;
