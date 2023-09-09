import { RefreshingAuthProvider } from "@twurple/auth";
import { getCredentials, getToken, getUserByRole, getUserByUserId, setToken } from "./prismaService.js";
import { UserAuthService } from "./UserAuthService.js";
const AuthService = async (isBroadcaster = false) => {
    const { clientId, clientSecret } = (await getCredentials());
    // Pulling the user once here to check if we've got the info from the Helix
    // API.
    const dbUser = (await getUserByRole(isBroadcaster));
    if (!clientId || !clientSecret) {
        throw new Error("No credentials found. Please set credentials.");
    }
    const tokenData = await getToken(isBroadcaster);
    const authProvider = new RefreshingAuthProvider({
        clientId,
        clientSecret,
    });
    // Only call this if we don't have the user's ID.
    if (!(dbUser === null || dbUser === void 0 ? void 0 : dbUser.userId)) {
        UserAuthService(dbUser, authProvider);
    }
    authProvider.onRefresh(
    // This is an event listener. The arguments come from when the event is emitted.
    async (userId, newTokenData) => {
        var _a, _b, _c;
        const user = (await getUserByUserId(userId));
        if (!user) {
            throw new Error("No user found.");
        }
        const newToken = {
            accessToken: newTokenData.accessToken,
            refreshToken: (_a = newTokenData.refreshToken) !== null && _a !== void 0 ? _a : "",
            expiresIn: (_b = newTokenData.expiresIn) !== null && _b !== void 0 ? _b : 0,
            obtainmentTimestamp: (_c = newTokenData.obtainmentTimestamp) !== null && _c !== void 0 ? _c : 0,
        };
        setToken(user, newToken).then(() => console.log("token refreshed"));
    }
    // await fs.writeFile(
    //   `./tokens.${userId}.json`,
    //   JSON.stringify(newTokenData, null, 4),
    //   "utf-8"
    // )
    );
    await authProvider.addUserForToken(tokenData);
    return authProvider;
};
export default AuthService;
