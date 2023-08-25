import { TwitchScopes } from "../../types/TwitchScopes.js";
;
// class Credentials extends EventEmitter {
//   async gotCredentials() {
//     await getCredentials().then((res) => {
//       this.emit('gotCredentials', res);
//     })
//   }
// }
// const credentials = new Credentials();
// credentials.on('gotCredentials', (res) => {
//   console.log(res);
// })
const logEnum = (scope) => {
    console.log(scope);
};
logEnum(TwitchScopes.ANALYTICS_READ_EXTENSIONS);
