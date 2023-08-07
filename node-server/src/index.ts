import { ApiClient, HelixUser } from "@twurple/api";
import authProvider from "./services/botAuthService";
import eventSub from "./events/eventSub";
import { ChatClient, PrivateMessage } from "@twurple/chat";
import { getNewFollows, getNewSubs, getResubs, getGiftSubs, getNewBits, setCredentials } from "./services/prismaService";
import ObsConnect from "./ws/wsObs";
import Fastify from "fastify";
import cors from "@fastify/cors"


interface Message {
  channel: string,
  user?: string,
  text?: string
}

const helixClient = new ApiClient({ authProvider });
const botName = 'jddoesbotstuff';
const broadcastObj = await helixClient.users.getUserByName('jddoesdev')
const botObj = await helixClient.users.getUserByName(botName);
const obs = await ObsConnect();
const fastify = Fastify({ logger: true });
await fastify.register(cors, {
  origin: "*",
});

const App = () => {

  const chatClient = new ChatClient({ authProvider, channels: ['jddoesdev'] });

  chatClient.connect();

  chatClient.onAuthenticationSuccess(() => {
    chatClient.onMessage(
      async (
        channel: string,
        user: string,
        text: string,
        msg: PrivateMessage
      ) => {
        if (msg.userInfo.isMod || msg.userInfo.isBroadcaster) {
          switch (text.split(" ")[0]) {
            case "!so":
              const soUser = text.split(" ")[1];
              const soHandler = (soUserObj: any) => {
                if (soUserObj) {
                  chatClient.say(
                    channel,
                    `Go check out ${soUserObj.displayName} at https://twitch.tv/${soUserObj.name}`
                  );
                  helixClient.chat.shoutoutUser(
                    broadcastObj!.id,
                    soUserObj.id,
                    botObj!.id
                  );
                }
              };
              await helixClient.users
                .getUserByName(soUser)
                .then(soHandler)
              break;
            default:
              break;
          }
        }
        if (botName !== user.toLowerCase()) {
          switch (text) {
            case '!stfu':
              setTimeout(sayStopIt, 10000,channel, user, text);
              break;
            case '!ewi':
              chatClient.say(
                channel,
                `An EWI is an Electronic Wind Instrument. It functions as a midi controller that can be played like a saxophone, clarinet, flute, or other wind instruments. Want to see JD play a song of your choosing? https://streamelements.com/jddoesdev/tip`
              );
              break;
            default:
              break;
          }
        }
      }
    );
  })

  const sayStopIt = (channel: string, user: any, text: any) => {
    chatClient.say(channel, `Listen, @${user}, That's rude.  Stop it.`);
  }



  // Add endpoints for react to get data for credits from.

  fastify.get('/', async (request, reply) => {
    console.log(request);
    reply.send({ hello: 'world' });
  })

  fastify.get('/api/follows', async (request, reply) => {
    const follows = await getNewFollows();
    reply.send(follows);
  });

  fastify.get('/api/subs', async (request, reply) => {
    const subs = await getNewSubs();
    reply.send(subs);
  });

  fastify.get('/api/resubs', async (request, reply) => {
    const resubs = await getResubs();
    reply.send(resubs);
  });

  fastify.get('/api/giftsubs', async (request, reply) => {
    const giftsubs = await getGiftSubs();
    reply.send(giftsubs);
  });

  fastify.get('/api/bits', async (request, reply) => {
    const bits = await getNewBits();
    reply.send(bits);
  });

  fastify.post('/api/credentials', async (request, reply) => {
    const { clientId, clientSecret } = request.body;
    const credentials = await setCredentials(clientId, clientSecret);
  });

  fastify.listen({ port: 3321}, (err, address) => {
    if (err) throw err;
    console.log(`Server is now listening on ${address}`);
  });

  eventSub(chatClient);

}

App();

