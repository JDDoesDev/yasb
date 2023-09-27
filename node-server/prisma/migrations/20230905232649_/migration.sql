-- CreateTable
CREATE TABLE "Follows" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "followerId" INTEGER NOT NULL,
    "followDate" TEXT NOT NULL,
    CONSTRAINT "Follows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "Viewer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Subs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subId" INTEGER NOT NULL,
    "subDateOrig" TEXT NOT NULL,
    "subDateRenew" TEXT NOT NULL,
    "streak" INTEGER NOT NULL,
    "totMonths" INTEGER NOT NULL,
    CONSTRAINT "Subs_subId_fkey" FOREIGN KEY ("subId") REFERENCES "Viewer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Bits" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "cheerDate" TEXT NOT NULL,
    "bitCount" INTEGER NOT NULL,
    CONSTRAINT "Bits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Viewer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GiftSubs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gifterId" INTEGER NOT NULL,
    "totAmount" INTEGER NOT NULL,
    "lastGiftDate" TEXT NOT NULL,
    "lastGiftSubs" INTEGER NOT NULL,
    CONSTRAINT "GiftSubs_gifterId_fkey" FOREIGN KEY ("gifterId") REFERENCES "Viewer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Credentials" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clientId" TEXT NOT NULL,
    "clientSecret" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tokens" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "obtainmentTimestamp" INTEGER NOT NULL DEFAULT 0,
    "expiresIn" INTEGER NOT NULL DEFAULT 0,
    "scope" TEXT NOT NULL,
    "AppUserName" TEXT NOT NULL,
    CONSTRAINT "Tokens_AppUserName_fkey" FOREIGN KEY ("AppUserName") REFERENCES "User" ("userName") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userName" TEXT NOT NULL,
    "userDisplayName" TEXT,
    "userId" TEXT,
    "isBroadcaster" BOOLEAN NOT NULL DEFAULT false,
    "profileImageUrl" TEXT
);

-- CreateTable
CREATE TABLE "Viewer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userName" TEXT NOT NULL,
    "userDisplayName" TEXT NOT NULL,
    "badges" TEXT,
    "profileImageUrl" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Follows_followerId_key" ON "Follows"("followerId");

-- CreateIndex
CREATE UNIQUE INDEX "Subs_subId_key" ON "Subs"("subId");

-- CreateIndex
CREATE UNIQUE INDEX "GiftSubs_gifterId_key" ON "GiftSubs"("gifterId");

-- CreateIndex
CREATE UNIQUE INDEX "Credentials_clientId_key" ON "Credentials"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "Credentials_clientSecret_key" ON "Credentials"("clientSecret");

-- CreateIndex
CREATE UNIQUE INDEX "Tokens_AppUserName_key" ON "Tokens"("AppUserName");

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_isBroadcaster_key" ON "User"("isBroadcaster");

-- CreateIndex
CREATE UNIQUE INDEX "Viewer_userName_key" ON "Viewer"("userName");
