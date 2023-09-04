"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userAuthService_1 = require("../../services/userAuthService");
var api_1 = require("@twurple/api");
var eventsub_ws_1 = require("@twurple/eventsub-ws");
var prismaService_1 = require("../../services/prismaService");
var wsObs_1 = require("../../ws/wsObs");
var obs = await (0, wsObs_1.default)();
var EventSub = function (chatClient) {
    var uid = "216709612";
    var bid = "911278001";
    var apiClient = new api_1.ApiClient({ authProvider: userAuthService_1.default });
    var listener = new eventsub_ws_1.EventSubWsListener({
        apiClient: apiClient
    });
    listener.start();
    // Keep these or let twitch handle it? I think I'll let twitch handle it.
    var updateSubscribe = listener.onChannelUpdate(uid, function (e) {
        chatClient.say('jddoesdev', "New title: ".concat(e.streamTitle));
    });
    var subGiftSubscribe = listener.onChannelSubscriptionGift(uid, function (e) {
        if (!e.isAnonymous) {
            var msg = "".concat(e.gifterDisplayName, " gifted ").concat(e.amount, " subs!");
            if (e.cumulativeAmount && e.cumulativeAmount > e.amount) {
                msg += " That's ".concat(e.cumulativeAmount, " subs total!");
            }
            chatClient.say('jddoesdev', msg);
            (0, prismaService_1.setGiftSubs)(e.gifterName, e.gifterDisplayName, e.amount, e.cumulativeAmount);
        }
        else {
            chatClient.say('jddoesdev', "An anonymous user gifted ".concat(e.amount, " subs!"));
        }
    });
    var bitsSubscribe = listener.onChannelCheer(uid, function (e) {
        var _a, _b;
        if (!e.isAnonymous) {
            switch (e.bits) {
                case 69:
                    chatClient.say('jddoesdev', "Nice! ".concat(e.userDisplayName, " cheered ").concat(e.bits, " bits!"));
                    break;
                case 420:
                    chatClient.say('jddoesdev', "Blaze it! ".concat(e.userDisplayName, " cheered ").concat(e.bits, " bits!"));
                    break;
                case 666:
                    chatClient.say('jddoesdev', "The number of the beast! ".concat(e.userDisplayName, " cheered ").concat(e.bits, " bits!"));
                    break;
                default:
                    if (e.bits > 50) {
                        chatClient.say('jddoesdev', "Holy cow! ".concat(e.userDisplayName, " cheered ").concat(e.bits, " bits!"));
                    }
                    break;
            }
            (0, prismaService_1.setNewBits)(e.bits, (_a = e.userDisplayName) !== null && _a !== void 0 ? _a : '', (_b = e.userName) !== null && _b !== void 0 ? _b : '');
        }
    });
    var followSubscribe = listener.onChannelFollow(uid, uid, function (e) {
        chatClient.say('jddoesdev', "A new follower arrives: ".concat(e.userDisplayName, "! Welcome to whatever this is!"));
        (0, prismaService_1.setNewFollows)(e.userDisplayName, e.userName);
    });
    var subSubscribe = listener.onChannelSubscription(uid, function (e) {
        if (!e.isGift) {
            chatClient.say('jddoesdev', "".concat(e.userDisplayName, " subscribed!!"));
            (0, prismaService_1.setNewSubs)(e.userDisplayName, e.userName);
        }
    });
    // Dear future me,
    // Please fix present me's code. It's bad. I'm sorry.
    var resubMsgSubscribe = listener.onChannelSubscriptionMessage(uid, function (e) {
        var _a;
        if (e.streakMonths === 0) {
            chatClient.say("jddoesdev", "".concat(e.userDisplayName, " resubscribed and had this to say: ").concat(e.messageText, "... They've subscribed for ").concat(e.streakMonths, " months in a row! Thank you!"));
            (0, prismaService_1.setNewSubs)(e.userDisplayName, e.userName, e.cumulativeMonths, (_a = e.streakMonths) !== null && _a !== void 0 ? _a : 1);
        }
    });
    var streamLive = listener.onStreamOnline(uid, function (e) {
        chatClient.say('jddoesdev', "Stream is live!");
    });
    var shoutoutCreated = listener.onChannelShoutoutCreate(uid, uid, function (e) {
    });
};
exports.default = EventSub;
