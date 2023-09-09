import { ApiClient } from "@twurple/api";
import AuthService from "./AuthService";
import { User } from "@prisma/client";
import { addOrUpdateUser, getUserByRole } from "./prismaService";
import { RefreshingAuthProvider } from "@twurple/auth";

export const UserAuthService = async (dbUser: User, authProvider: RefreshingAuthProvider) => {

  const api = new ApiClient({ authProvider });
  const user = await api.users.getUserByName(dbUser.userName as string);

  dbUser.userId = user?.id as unknown as string;

  const dbUserUpdate = {
    userName: dbUser.userName,
    userDisplayName: user?.displayName,
    userId: user?.id,
    isBroadcaster: dbUser.isBroadcaster,
    profileImageUrl: user?.profilePictureUrl,
  };

  await addOrUpdateUser(dbUserUpdate as unknown as User);

};

