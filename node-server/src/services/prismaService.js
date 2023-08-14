"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient({
    log: ["query", "info", "warn", "error"]
});
var _date = new Date().toDateString();
console.log(_date);
exports.setNewFollows = function (userDisplayName, userName) { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.user.upsert({
                        where: {
                            userName: userName
                        },
                        update: {
                            follows: {
                                create: {
                                    followDate: _date
                                }
                            }
                        },
                        create: {
                            userName: userName,
                            userDisplayName: userDisplayName,
                            follows: {
                                create: {
                                    followDate: _date
                                }
                            }
                        }
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.setNewSubs = function (userDisplayName, userName, totMonths, streak) {
    if (totMonths === void 0) { totMonths = 1; }
    if (streak === void 0) { streak = 1; }
    return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.user.upsert({
                            where: {
                                userName: userName
                            },
                            update: {
                                subs: {
                                    upsert: {
                                        create: {
                                            streak: streak,
                                            subDateRenew: _date,
                                            subDateOrig: _date,
                                            totMonths: totMonths
                                        },
                                        update: {
                                            streak: streak,
                                            subDateRenew: _date,
                                            totMonths: totMonths
                                        }
                                    }
                                }
                            },
                            create: {
                                userName: userName,
                                userDisplayName: userDisplayName,
                                subs: {
                                    create: {
                                        streak: streak,
                                        subDateOrig: _date,
                                        subDateRenew: _date,
                                        totMonths: totMonths
                                    }
                                }
                            }
                        })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.setNewBits = function (bits, userDisplayName, userName) {
    if (userDisplayName === void 0) { userDisplayName = ""; }
    if (userName === void 0) { userName = ""; }
    return __awaiter(void 0, void 0, void 0, function () {
        var user, result, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = null;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, prisma.user.findUnique({
                            where: {
                                userName: userName
                            }
                        })];
                case 2:
                    result = _a.sent();
                    if (result) {
                        user = result.userName;
                    }
                    else {
                        user = userName !== null && userName !== void 0 ? userName : null;
                    }
                    if (!user) return [3 /*break*/, 4];
                    return [4 /*yield*/, prisma.bits.create({
                            data: {
                                bitCount: bits,
                                cheerDate: _date,
                                user: {
                                    connectOrCreate: {
                                        where: {
                                            userName: user
                                        },
                                        create: {
                                            userName: user,
                                            userDisplayName: userDisplayName
                                        }
                                    }
                                }
                            }
                        })];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    ;
                    return [3 /*break*/, 6];
                case 5:
                    error_3 = _a.sent();
                    console.log(error_3);
                    return [3 /*break*/, 6];
                case 6:
                    ;
                    return [2 /*return*/];
            }
        });
    });
};
exports.setGiftSubs = function (gifter, gifterDisplayName, amount, totAmount) { return __awaiter(void 0, void 0, void 0, function () {
    var error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.user.upsert({
                        where: {
                            userName: gifter
                        },
                        update: {
                            giftSubs: {
                                upsert: {
                                    create: {
                                        lastGiftDate: _date,
                                        lastGiftSubs: amount,
                                        totAmount: totAmount !== null && totAmount !== void 0 ? totAmount : amount
                                    },
                                    update: {
                                        lastGiftDate: _date,
                                        lastGiftSubs: amount,
                                        totAmount: totAmount !== null && totAmount !== void 0 ? totAmount : amount
                                    }
                                }
                            }
                        },
                        create: {
                            userName: gifter,
                            userDisplayName: gifterDisplayName,
                            giftSubs: {
                                create: {
                                    lastGiftDate: _date,
                                    lastGiftSubs: amount,
                                    totAmount: totAmount !== null && totAmount !== void 0 ? totAmount : amount
                                }
                            }
                        }
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.log(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getNewFollows = function () { return __awaiter(void 0, void 0, void 0, function () {
    var follows, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("HERE BE THE DATE!!! YAR!!! " + _date);
                return [4 /*yield*/, prisma.follows.findMany({
                        where: {
                            followDate: _date
                        }
                    })];
            case 1:
                follows = _a.sent();
                return [2 /*return*/, follows];
            case 2:
                error_5 = _a.sent();
                console.log(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getNewSubs = function () { return __awaiter(void 0, void 0, void 0, function () {
    var subs, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.subs.findMany({
                        where: {
                            subDateOrig: _date
                        }
                    })];
            case 1:
                subs = _a.sent();
                return [2 /*return*/, subs];
            case 2:
                error_6 = _a.sent();
                console.log(error_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getResubs = function () { return __awaiter(void 0, void 0, void 0, function () {
    var subs, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.subs.findMany({
                        where: {
                            subDateRenew: _date
                        }
                    })];
            case 1:
                subs = _a.sent();
                return [2 /*return*/, subs];
            case 2:
                error_7 = _a.sent();
                console.log(error_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getNewBits = function () { return __awaiter(void 0, void 0, void 0, function () {
    var bits, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.bits.findMany({
                        where: {
                            cheerDate: _date
                        }
                    })];
            case 1:
                bits = _a.sent();
                return [2 /*return*/, bits];
            case 2:
                error_8 = _a.sent();
                console.log(error_8);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getGiftSubs = function () { return __awaiter(void 0, void 0, void 0, function () {
    var giftSubs, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.giftSubs.findMany({
                        where: {
                            lastGiftDate: _date
                        }
                    })];
            case 1:
                giftSubs = _a.sent();
                return [2 /*return*/, giftSubs];
            case 2:
                error_9 = _a.sent();
                console.log(error_9);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.setCredentials = function (clientId, clientSecret) { return __awaiter(void 0, void 0, void 0, function () {
    var error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.credentials.upsert({
                        where: {
                            clientId: clientId
                        },
                        update: {
                            clientSecret: clientSecret
                        },
                        create: {
                            clientId: clientId,
                            clientSecret: clientSecret
                        }
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_10 = _a.sent();
                console.log(error_10);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCredentials = function () { return __awaiter(void 0, void 0, void 0, function () {
    var credentials, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.credentials.findFirst()];
            case 1:
                credentials = _a.sent();
                return [2 /*return*/, credentials];
            case 2:
                error_11 = _a.sent();
                console.log(error_11);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
