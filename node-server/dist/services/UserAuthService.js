import { ApiClient } from "@twurple/api";
import { addOrUpdateUser } from "./prismaService";
export const UserAuthService = async (dbUser, authProvider) => {
    const api = new ApiClient({ authProvider });
    const user = await api.users.getUserByName(dbUser.userName);
    dbUser.userId = user === null || user === void 0 ? void 0 : user.id;
    const dbUserUpdate = {
        userName: dbUser.userName,
        userDisplayName: user === null || user === void 0 ? void 0 : user.displayName,
        userId: user === null || user === void 0 ? void 0 : user.id,
        isBroadcaster: dbUser.isBroadcaster,
        profileImageUrl: user === null || user === void 0 ? void 0 : user.profilePictureUrl,
    };
    await addOrUpdateUser(dbUserUpdate);
};
