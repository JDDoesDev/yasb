import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
});
const _date = new Date().toDateString();
export const setNewFollows = async (userDisplayName, userName) => {
    // check if follower exists in db and if not, add them.
    // otherwise update.
    try {
        await prisma.user.upsert({
            where: {
                userName: userName,
            },
            update: {
                follows: {
                    create: {
                        followDate: _date,
                    },
                },
            },
            create: {
                userName: userName,
                userDisplayName: userDisplayName,
                follows: {
                    create: {
                        followDate: _date,
                    }
                }
            }
        });
    }
    catch (error) {
        console.log(error);
    }
};
export const setNewSubs = async (userDisplayName, userName, totMonths = 1, streak = 1) => {
    // check if subscriber exists in db and if not, add them.
    // otherwise update.
    // const _date = new Date().toISOString();
    try {
        await prisma.user.upsert({
            where: {
                userName: userName,
            },
            update: {
                subs: {
                    upsert: {
                        create: {
                            streak: streak,
                            subDateRenew: _date,
                            subDateOrig: _date,
                            totMonths: totMonths,
                        },
                        update: {
                            streak: streak,
                            subDateRenew: _date,
                            totMonths: totMonths,
                        },
                    },
                },
            },
            create: {
                userName: userName,
                userDisplayName: userDisplayName,
                subs: {
                    create: {
                        streak: streak,
                        subDateOrig: _date,
                        subDateRenew: _date,
                        totMonths: totMonths,
                    }
                }
            },
        });
    }
    catch (error) {
        console.log(error);
    }
};
export const setNewBits = async (bits, userDisplayName = "", userName = "") => {
    // check if user exists in db and if not, add them.
    // otherwise update.
    // const _date = new Date().toISOString();
    let user = null;
    try {
        const result = await prisma.user.findUnique({
            where: {
                userName: userName,
            },
        });
        if (result) {
            user = result.userName;
        }
        else {
            user = userName !== null && userName !== void 0 ? userName : null;
        }
        if (user) {
            await prisma.bits.create({
                data: {
                    bitCount: bits,
                    cheerDate: _date,
                    user: {
                        connectOrCreate: {
                            where: {
                                userName: user,
                            },
                            create: {
                                userName: user,
                                userDisplayName: userDisplayName,
                            }
                        }
                    }
                }
            });
        }
        ;
    }
    catch (error) {
        console.log(error);
    }
    ;
};
export const setGiftSubs = async (gifter, gifterDisplayName, amount, totAmount) => {
    // check if gifter exists in db and if not, add them.
    // otherwise update.
    // const _date = new Date().toISOString();
    try {
        await prisma.user.upsert({
            where: {
                userName: gifter,
            },
            update: {
                giftSubs: {
                    upsert: {
                        create: {
                            lastGiftDate: _date,
                            lastGiftSubs: amount,
                            totAmount: totAmount !== null && totAmount !== void 0 ? totAmount : amount,
                        },
                        update: {
                            lastGiftDate: _date,
                            lastGiftSubs: amount,
                            totAmount: totAmount !== null && totAmount !== void 0 ? totAmount : amount,
                        },
                    },
                },
            },
            create: {
                userName: gifter,
                userDisplayName: gifterDisplayName,
                giftSubs: {
                    create: {
                        lastGiftDate: _date,
                        lastGiftSubs: amount,
                        totAmount: totAmount !== null && totAmount !== void 0 ? totAmount : amount,
                    },
                },
            },
        });
    }
    catch (error) {
        console.log(error);
    }
};
export const getNewFollows = async () => {
    // get all follows from db
    // return follows
    try {
        console.log(`HERE BE THE DATE!!! YAR!!! ${_date}`);
        const follows = await prisma.follows.findMany({
            where: {
                followDate: _date,
            },
        });
        return follows;
    }
    catch (error) {
        console.log(error);
    }
};
export const getNewSubs = async () => {
    // get all subs from db
    // return subs
    try {
        const subs = await prisma.subs.findMany({
            where: {
                subDateOrig: _date,
            },
        });
        return subs;
    }
    catch (error) {
        console.log(error);
    }
};
export const getResubs = async () => {
    // get all subs from db
    // return subs
    try {
        const subs = await prisma.subs.findMany({
            where: {
                subDateRenew: _date,
            },
        });
        return subs;
    }
    catch (error) {
        console.log(error);
    }
};
export const getNewBits = async () => {
    // get all bits from db
    // return bits
    try {
        const bits = await prisma.bits.findMany({
            where: {
                cheerDate: _date,
            },
        });
        return bits;
    }
    catch (error) {
        console.log(error);
    }
};
export const getGiftSubs = async () => {
    // get all gift subs from db
    // return gift subs
    try {
        const giftSubs = await prisma.giftSubs.findMany({
            where: {
                lastGiftDate: _date,
            },
        });
        return giftSubs;
    }
    catch (error) {
        console.log(error);
    }
};
export const setCredentials = async (clientId, clientSecret) => {
    // check if credentials exist in db and if not, add them.
    // otherwise update.
    // const _date = new Date().toISOString();
    try {
        await prisma.credentials.upsert({
            where: {
                clientId: clientId,
            },
            update: {
                clientSecret: clientSecret,
            },
            create: {
                clientId: clientId,
                clientSecret: clientSecret,
            },
        });
    }
    catch (error) {
        console.log(error);
    }
};
export const getCredentials = async () => {
    // get credentials from db
    // return credentials
    try {
        const credentials = await prisma.credentials.findFirst();
        return credentials;
    }
    catch (error) {
        console.log(error);
    }
};
