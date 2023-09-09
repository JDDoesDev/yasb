import AuthService from "./services/AuthService.js";
import { ApiClient } from "@twurple/api";
const authProvider = await AuthService(true);
const api = new ApiClient({ authProvider });
const user = await api.users.getUserByName('jddoesdev');
console.log(user);
