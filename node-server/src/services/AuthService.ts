import { RefreshingAuthProvider, exchangeCode } from "@twurple/auth";
import { promises as fs } from "fs";
import { getCredentials, getToken } from "./prismaService";
import { CredentialBody } from "../types/Credentials.types";

const AuthService = async (isBroadcaster = false) => {
  const { clientId, clientSecret }: CredentialBody = (await getCredentials()) as CredentialBody;

  const tokenArray = await getToken(isBroadcaster);
  if (!tokenArray.hasOwnProperty("accessToken")) {

  }

  if (clientId && clientSecret) {
    const authProvider = new RefreshingAuthProvider({
      clientId,
      clientSecret,
    });

    authProvider.onRefresh(
      async (userId, newTokenData) =>
        await fs.writeFile(
          `./tokens.${userId}.json`,
          JSON.stringify(newTokenData, null, 4),
          "utf-8"
        )
    );

    // await authProvider.addUserForToken(tokenData)
    return authProvider;
  }
};
export default AuthService;
