import { getCredentials } from "./services/prismaService";
import EventEmitter from "events";

interface CredentialBody {
  id: number;
  clientId: string;
  clientSecret: string;
};

class Credentials extends EventEmitter {

  async gotCredentials() {
    await getCredentials().then((res) => {
      this.emit('gotCredentials', res);
    })
  }
}

const credentials = new Credentials();

credentials.on('gotCredentials', (res) => {
  console.log(res);
})
