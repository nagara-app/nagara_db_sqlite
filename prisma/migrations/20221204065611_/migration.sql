/*
  Warnings:

  - You are about to drop the column `is_variant` on the `radical` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_radical" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "literal" TEXT NOT NULL,
    "literal_" TEXT,
    "stroke_count" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "variantOf" INTEGER
);
INSERT INTO "new_radical" ("id", "literal", "literal_", "number", "stroke_count") SELECT "id", "literal", "literal_", "number", "stroke_count" FROM "radical";
DROP TABLE "radical";
ALTER TABLE "new_radical" RENAME TO "radical";
CREATE UNIQUE INDEX "radical_literal_key" ON "radical"("literal");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
