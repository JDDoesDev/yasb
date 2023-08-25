import { ApiClient } from "@twurple/api";
import { ChatClient } from "@twurple/chat";
import AuthService from "../../services/AuthService";
import EventSub from "../EventSub/EventSub";
const ChatSub = async () => {
    var _a;
    const authProvider = (_a = (await AuthService(false))) !== null && _a !== void 0 ? _a : false;
    let helixClient, broadcastObj, botObj, botName, chatClient;
    if (authProvider) {
        helixClient = new ApiClient({ authProvider });
        botName = "jddoesbotstuff";
        broadcastObj = await helixClient.users.getUserByName("jddoesdev");
        botObj = await helixClient.users.getUserByName(botName);
        chatClient = new ChatClient({ authProvider, channels: ["jddoesdev"] });
        void chatClient.connect();
        chatClient.onAuthenticationSuccess(() => {
            chatClient.onMessage(async (channel, user, text, msg) => {
                if (msg.userInfo.isMod || msg.userInfo.isBroadcaster) {
                    switch (text.split(" ")[0]) {
                        case "!so":
                            const soUser = text.split(" ")[1];
                            const soHandler = (soUserObj) => {
                                if (soUserObj) {
                                    chatClient.say(channel, `Go check out ${soUserObj.displayName} at https://twitch.tv/${soUserObj.name}`);
                                    // Can we get shoutout cooldown?
                                    helixClient.chat.shoutoutUser(broadcastObj.id, soUserObj.id);
                                }
                            };
                            await helixClient.users.getUserByName(soUser).then(soHandler);
                            break;
                        default:
                            break;
                    }
                }
                if (botName !== user.toLowerCase()) {
                    switch (text) {
                        case "!stfu":
                            setTimeout(sayStopIt, 10000, channel, user, text);
                            break;
                        case "!ewi":
                            chatClient.say(channel, `An EWI is an Electronic Wind Instrument. It functions as a midi controller that can be played like a saxophone, clarinet, flute, or other wind instruments. Want to see JD play a song of your choosing? https://streamelements.com/jddoesdev/tip`);
                            break;
                        default:
                            break;
                    }
                }
            });
        });
        const sayStopIt = (channel, user, text) => {
            chatClient.say(channel, `Listen, @${user}, That's rude.  Stop it.`);
        };
        EventSub(chatClient);
    }
};
export default ChatSub;
