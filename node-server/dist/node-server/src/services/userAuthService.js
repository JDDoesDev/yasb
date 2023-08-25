var _a, _b;
import { RefreshingAuthProvider } from "@twurple/auth";
import { promises as fs } from "fs";
const clientId = (_a = process.env.CLIENT_ID) !== null && _a !== void 0 ? _a : 'test';
const clientSecret = (_b = process.env.ACCESS_TOKEN) !== null && _b !== void 0 ? _b : 'test';
const tokenData = JSON.parse(await fs.readFile("./tokens/tokens.216709612.json", "utf-8"));
const authProvider = new RefreshingAuthProvider({
    clientId,
    clientSecret,
    // onRefresh: async (userId: any, newTokenData: any) =>
    //   await fs.writeFile(
    //     `./tokens/tokens.${userId}.json`,
    //     JSON.stringify(newTokenData, null, 4),
    //     "utf-8"
    //   ),
});
await authProvider.addUser("216709612", tokenData);
export default authProvider;
