-- CreateTable
CREATE TABLE "Follows" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "follower" TEXT NOT NULL,
    "followDate" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Subs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "follower" TEXT NOT NULL,
    "followDate" TEXT NOT NULL,
    "streak" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Bits" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "follower" TEXT NOT NULL,
    "bitCount" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Follows_follower_key" ON "Follows"("follower");

-- CreateIndex
CREATE UNIQUE INDEX "Subs_follower_key" ON "Subs"("follower");

-- CreateIndex
CREATE UNIQUE INDEX "Bits_follower_key" ON "Bits"("follower");
