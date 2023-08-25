import { getNewFollows, getNewSubs, getResubs, getGiftSubs, getNewBits, setCredentials, getCredentials } from "./services/prismaService";
import ObsConnect from "./ws/wsObs";
import Fastify from "fastify";
import cors from "@fastify/cors";
const obs = await ObsConnect();
const fastify = Fastify({ logger: true });
await fastify.register(cors, {
    origin: "*",
});
const App = () => {
    // Add endpoints for react to get data for credits from.
    fastify.get('/', async (request, reply) => {
        reply.send({ hello: 'world' });
    });
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
        const body = request.body;
        await setCredentials(body.clientId, body.clientSecret);
    });
    fastify.get('/api/credentials', async (request, reply) => {
        const credentials = await getCredentials();
        reply.send(credentials);
    });
    fastify.post('/api/token', async (request, reply) => {
    });
    fastify.listen({ port: 3321 }, (err, address) => {
        if (err)
            throw err;
        console.log(`Server is now listening on ${address}`);
    });
    // ChatSub();
};
App();
