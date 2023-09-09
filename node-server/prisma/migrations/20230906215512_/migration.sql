/*
  Warnings:

  - You are about to alter the column `expiresIn` on the `Tokens` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `obtainmentTimestamp` on the `Tokens` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - Made the column `scope` on table `Tokens` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tokens" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "obtainmentTimestamp" BIGINT NOT NULL DEFAULT 0,
    "expiresIn" BIGINT NOT NULL DEFAULT 0,
    "scope" TEXT NOT NULL,
    "AppUserName" TEXT NOT NULL,
    CONSTRAINT "Tokens_AppUserName_fkey" FOREIGN KEY ("AppUserName") REFERENCES "User" ("userName") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tokens" ("AppUserName", "accessToken", "expiresIn", "id", "obtainmentTimestamp", "refreshToken", "scope") SELECT "AppUserName", "accessToken", "expiresIn", "id", "obtainmentTimestamp", "refreshToken", "scope" FROM "Tokens";
DROP TABLE "Tokens";
ALTER TABLE "new_Tokens" RENAME TO "Tokens";
CREATE UNIQUE INDEX "Tokens_AppUserName_key" ON "Tokens"("AppUserName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
