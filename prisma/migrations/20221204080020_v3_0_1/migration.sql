/*
  Warnings:

  - Made the column `variantOf` on table `radical` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_radical" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "literal" TEXT NOT NULL,
    "literal_" TEXT,
    "stroke_count" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "variantOf" TEXT NOT NULL
);
INSERT INTO "new_radical" ("id", "literal", "literal_", "number", "stroke_count", "variantOf") SELECT "id", "literal", "literal_", "number", "stroke_count", "variantOf" FROM "radical";
DROP TABLE "radical";
ALTER TABLE "new_radical" RENAME TO "radical";
CREATE UNIQUE INDEX "radical_literal_key" ON "radical"("literal");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
