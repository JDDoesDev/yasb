import authProvider from "../services/userAuthService";
import { ApiClient } from "@twurple/api";
import { EventSubWsListener } from "@twurple/eventsub-ws";
import { setNewFollows, setNewBits, setNewSubs, setGiftSubs } from "../services/prismaService";
import ObsConnect from "../ws/wsObs";
const obs = await ObsConnect();
const eventSub = (chatClient) => {
    const uid = "216709612";
    const bid = "911278001";
    const apiClient = new ApiClient({ authProvider });
    // const getUid = async () => await apiClient.users.getUserByName('jddoesdev');
    // getUid().then(user => user)
    //   .then(console.log)
    const listener = new EventSubWsListener({
        apiClient
    });
    listener.start();
    // Keep these or let twitch handle it? I think I'll let twitch handle it.
    const updateSubscribe = listener.onChannelUpdate(uid, (e) => {
        chatClient.say('jddoesdev', `New title: ${e.streamTitle}`);
    });
    const subGiftSubscribe = listener.onChannelSubscriptionGift(uid, (e) => {
        if (!e.isAnonymous) {
            let msg = `${e.gifterDisplayName} gifted ${e.amount} subs!`;
            if (e.cumulativeAmount && e.cumulativeAmount > e.amount) {
                msg += ` That's ${e.cumulativeAmount} subs total!`;
            }
            chatClient.say('jddoesdev', msg);
            setGiftSubs(e.gifterDisplayName, e.amount, e.cumulativeAmount);
        }
    });
    const bitsSubscribe = listener.onChannelCheer(uid, (e) => {
        var _a;
        if (!e.isAnonymous) {
            switch (e.bits) {
                case 69:
                    chatClient.say('jddoesdev', `Nice! ${e.userDisplayName} cheered ${e.bits} bits!`);
                    break;
                case 420:
                    chatClient.say('jddoesdev', `Blaze it! ${e.userDisplayName} cheered ${e.bits} bits!`);
                    break;
                case 666:
                    chatClient.say('jddoesdev', `The number of the beast! ${e.userDisplayName} cheered ${e.bits} bits!`);
                    break;
                default:
                    if (e.bits > 50) {
                        chatClient.say('jddoesdev', `Holy cow! ${e.userDisplayName} cheered ${e.bits} bits!`);
                    }
                    break;
            }
            setNewBits(e.bits, (_a = e.userDisplayName) !== null && _a !== void 0 ? _a : '', e.userName);
        }
    });
    const followSubscribe = listener.onChannelFollow(uid, uid, (e) => {
        chatClient.say('jddoesdev', `A new follower arrives: ${e.userDisplayName}! Welcome to whatever this is!`);
        setNewFollows(e.userDisplayName, e.userName);
    });
    const subSubscribe = listener.onChannelSubscription(uid, (e) => {
        chatClient.say('jddoesdev', `${e.userDisplayName} subscribed!!`);
        setNewSubs(e.userDisplayName, e.userName);
    });
    // Dear future me,
    // Please fix present me's code. It's bad. I'm sorry.
    const resubMsgSubscribe = listener.onChannelSubscriptionMessage(uid, (e) => {
        var _a;
        if (e.streakMonths === 0) {
            chatClient.say("jddoesdev", `${e.userDisplayName} resubscribed and had this to say: ${e.messageText}... They've subscribed for ${e.streakMonths} months in a row! Thank you!`);
            setNewSubs(e.userDisplayName, e.userName, e.cumulativeMonths, (_a = e.streakMonths) !== null && _a !== void 0 ? _a : 1);
        }
    });
    const streamLive = listener.onStreamOnline(uid, (e) => {
        chatClient.say('jddoesdev', `Stream is live!`);
    });
};
export default eventSub;
