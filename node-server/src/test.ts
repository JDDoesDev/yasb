import { RefreshingAuthProvider } from "@twurple/auth";
import AuthService from "./services/AuthService.js";
import { ApiClient } from "@twurple/api";

const authProvider = await AuthService() as unknown as RefreshingAuthProvider ;
const api = new ApiClient({ authProvider });
const user = await api.users.getUserByName('jddoesdev');

console.log(user);



