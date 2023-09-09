import { AccessToken, RefreshingAuthProvider } from "@twurple/auth";
import { getCredentials, getToken, getUserByRole, getUserByUserId, setToken } from "./prismaService";
import { CredentialBody, TokenBody } from "../types/Credentials.types";
import { UserAuthService } from "./UserAuthService";
import { User } from "@prisma/client";

const AuthService = async (isBroadcaster = false) => {
  const { clientId, clientSecret }: CredentialBody =
    (await getCredentials()) as CredentialBody;
  // Pulling the user once here to check if we've got the info from the Helix
  // API.
  const dbUser = (await getUserByRole(isBroadcaster)) as User;

  if (!clientId || !clientSecret) {
    throw new Error("No credentials found. Please set credentials.");
  }

  const tokenData = await getToken(isBroadcaster);

  const authProvider = new RefreshingAuthProvider({
    clientId,
    clientSecret,
  });

  // Only call this if we don't have the user's ID.
  if (!dbUser?.userId) {
    UserAuthService(dbUser, authProvider);
  }

  authProvider.onRefresh(
    // This is an event listener. The arguments come from when the event is emitted.
    async (userId, newTokenData) => {
      const user: User = (await getUserByUserId(userId)) as User;

      if (!user) {
        throw new Error("No user found.");
      }

      const newToken = {
        accessToken: newTokenData.accessToken,
        refreshToken: newTokenData.refreshToken ?? "",
        expiresIn: newTokenData.expiresIn ?? 0,
        obtainmentTimestamp: newTokenData.obtainmentTimestamp ?? 0,
      };

      setToken(user, newToken).then(() => console.log("token refreshed"));
    }
    // await fs.writeFile(
    //   `./tokens.${userId}.json`,
    //   JSON.stringify(newTokenData, null, 4),
    //   "utf-8"
    // )
  );

  await authProvider.addUserForToken(tokenData as unknown as AccessToken);

  return authProvider as RefreshingAuthProvider;
};

export default AuthService;
