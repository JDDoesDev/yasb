import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});
const _date = new Date().toDateString();
console.log(_date);

export const setNewFollows = async (
  userDisplayName: string,
  userName: string
) => {
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
  } catch (error) {
    console.log(error);
  }
};

export const setNewSubs = async (
  userDisplayName: string,
  userName: string,
  totMonths: number = 1,
  streak: number = 1
) => {
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
          create: {
            streak: streak,
            subDateRenew: _date,
            subDateOrig: _date,
            totMonths: totMonths,
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
  } catch (error) {
    console.log(error);
  }
};

export const setNewBits = async (
  bits: number,
  userDisplayName = "",
  userName = ""
) => {
  // check if user exists in db and if not, add them.
  // otherwise update.
  // const _date = new Date().toISOString();
  let user: string | null = null;
  try {
    const result = await prisma.user.findUnique({
      where: {
        userName: userName,
      },
    });

    if (result) {
      user = result.userName;
    }

    if (user) {
      await prisma.bits.create({
        data: {
          bitCount: bits,
          cheerDate: _date,
          user:{
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
    };
  }
  catch (error) {
    console.log(error);
  };
};

export const setGiftSubs = async (
  gifter: string,
  amount: number,
  totAmount: number | null
) => {
  // check if gifter exists in db and if not, add them.
  // otherwise update.
  // const _date = new Date().toISOString();

  try {
    await prisma.giftSubs.upsert({
      where: {
        gifter: gifter,
      },
      update: {
        lastGiftDate: _date,
        amount: amount,
        totAmount: totAmount ?? amount,
      },
      create: {
        gifter: gifter,
        lastGiftDate: _date,
        amount: amount,
        totAmount: totAmount ?? amount,
      },
    });
  } catch (error) {
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
  } catch (error) {
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
  } catch (error) {
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
  } catch (error) {
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
  } catch (error) {
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
  } catch (error) {
    console.log(error);
  }
};

export const setCredentials = async (
  clientId: string,
  clientSecret: string
) => {
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
  } catch (error) {
    console.log(error);
  }
};
