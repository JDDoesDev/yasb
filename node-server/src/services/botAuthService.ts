import * as dotenv from 'dotenv';
dotenv.config();
import { RefreshingAuthProvider } from "@twurple/auth";
import { promises as fs } from "fs";

const clientId  = process.env.CLIENT_ID ?? 'test';
const clientSecret = process.env.ACCESS_TOKEN ?? 'test';
const tokenData = JSON.parse(
  await fs.readFile("./tokens/tokens.911278001.json", "utf-8")
);

const authProvider = new RefreshingAuthProvider({
  clientId,
  clientSecret,
  onRefresh: async (userId: any, newTokenData: any) =>
    await fs.writeFile(
      `./tokens/tokens.${userId}.json`,
      JSON.stringify(newTokenData, null, 4),
      "utf-8"
    ),
});

await authProvider.addUserForToken(tokenData, ['chat']);

export default authProvider;
