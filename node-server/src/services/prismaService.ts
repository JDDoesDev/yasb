import { PrismaClient, User } from "@prisma/client";
import { TokenBody } from "../types/Credentials.types";
import { AccessToken } from "@twurple/auth";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});
const _date = new Date().toDateString();

export const setNewFollows = async (
  userDisplayName: string,
  userName: string
) => {
  // check if follower exists in db and if not, add them.
  // otherwise update.

  try {
    await prisma.viewer.upsert({
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
    await prisma.viewer.upsert({
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
    } else {
      user = userName ?? null;
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
  gifterDisplayName: string,
  amount: number,
  totAmount: number | null
) => {
  // check if gifter exists in db and if not, add them.
  // otherwise update.
  // const _date = new Date().toISOString();

  try {
    await prisma.viewer.upsert({
      where: {
        userName: gifter,
      },
      update: {
        giftSubs: {
          upsert: {
            create: {
              lastGiftDate: _date,
              lastGiftSubs: amount,
              totAmount: totAmount ?? amount,
            },
            update: {
              lastGiftDate: _date,
              lastGiftSubs: amount,
              totAmount: totAmount ?? amount,
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
            totAmount: totAmount ?? amount,
          },
        },
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
        id: 1,
      },
      update: {
        clientId: clientId,
        clientSecret: clientSecret,
      },
      create: {
        clientId: clientId,
        clientSecret: clientSecret,
      },
    }).then();
  } catch (error) {
    console.log(error);
  }

};

export const getCredentials = async () => {
  // get credentials from db
  // return credentials
  try {
    const credentials = await prisma.credentials.findFirstOrThrow();
    return credentials;
  } catch (error) {
    console.log(error);
  }
}

export const setToken = async (userName: string | undefined, token: TokenBody) => {
  // check if token exists in db and if not, add them.
  // also updates/refreshes token.
  const scope = JSON.stringify(token.scope);
  try {
    await prisma.tokens.upsert({
      where: {
        AppUserName: userName,
      },
      update: {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        expiresIn: token.expiresIn,
        scope: scope,
      },
      create: {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        expiresIn: 0,
        scope: scope,
        obtainmentTimestamp: 0,
        User: {
          connect: {
              userName: userName,
            },
          },
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export const getToken = async (isBroadcaster: boolean) => {
  // get token from db
  // return token
  let token: TokenBody | object = [];
  try {
    token = await prisma.tokens.findMany({
      where: {
        User: {
          isBroadcaster: isBroadcaster,
        },
      }
    })
  } catch (error) {
    console.log(error);
  }
  return token;

}

export const addOrUpdateUser = async (user: User) => {
  // check if user exists in db and if not, add them.
  // otherwise update.
  try {
    await prisma.user.upsert({
      where: {
        userName: user.userName,
      },
      update: {
        userName: user.userName,
        userDisplayName: user?.userDisplayName,
        isBroadcaster: user.isBroadcaster,
        profileImageUrl: user?.profileImageUrl,
        userId: user?.userId,
      },
      create: {
        userName: user.userName,
        userDisplayName: user?.userDisplayName,
        isBroadcaster: user.isBroadcaster,
        profileImageUrl: user?.profileImageUrl,
        userId: user?.userId,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export const getUserByUsername = async (userName: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        userName: userName,
      },
    });
    return user;
  }
  catch (error) {
    console.log(error);
  }
}
export const getUserByRole = async (userRole: string) => {
  try {
    const isBroadcaster = userRole === 'twitch-role:streamer' ? true : false
    const user = await prisma.user.findUnique({
      where: {
        isBroadcaster: isBroadcaster,
      },
    });
    return user;
  }
  catch (error) {
    console.log(error);
  }
}
