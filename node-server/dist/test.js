import { getCredentials } from "./services/prismaService.js"
import EventEmitter from "events";
;
class Credentials extends EventEmitter {
    async gotCredentials() {
      await getCredentials().then((res) => {
          this.emit('gotCredentials', res);
      });
      this.testEmit();
    }
    testEmit() {
      this.emit('testing');
    }
}

const credentials = new Credentials();

credentials.on('gotCredentials', (res) => {
    console.log(res);
});

credentials.on('testing', () => {
  console.log('testing')
})


credentials.gotCredentials();
