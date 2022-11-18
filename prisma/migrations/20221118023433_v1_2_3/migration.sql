/*
  Warnings:

  - Added the required column `position` to the `radical_meaning` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_radical_meaning" (
    "radical_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    PRIMARY KEY ("radical_id", "value"),
    CONSTRAINT "radical_meaning_radical_id_fkey" FOREIGN KEY ("radical_id") REFERENCES "radical" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_radical_meaning" ("radical_id", "value") SELECT "radical_id", "value" FROM "radical_meaning";
DROP TABLE "radical_meaning";
ALTER TABLE "new_radical_meaning" RENAME TO "radical_meaning";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
