/*
  Warnings:

  - You are about to alter the column `value` on the `kw_kanji_jlpt` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `value` on the `kw_kanji_grade` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_kw_kanji_jlpt" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" INTEGER NOT NULL
);
INSERT INTO "new_kw_kanji_jlpt" ("id", "value") SELECT "id", "value" FROM "kw_kanji_jlpt";
DROP TABLE "kw_kanji_jlpt";
ALTER TABLE "new_kw_kanji_jlpt" RENAME TO "kw_kanji_jlpt";
CREATE UNIQUE INDEX "kw_kanji_jlpt_value_key" ON "kw_kanji_jlpt"("value");
CREATE TABLE "new_kw_kanji_grade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" INTEGER NOT NULL
);
INSERT INTO "new_kw_kanji_grade" ("id", "value") SELECT "id", "value" FROM "kw_kanji_grade";
DROP TABLE "kw_kanji_grade";
ALTER TABLE "new_kw_kanji_grade" RENAME TO "kw_kanji_grade";
CREATE UNIQUE INDEX "kw_kanji_grade_value_key" ON "kw_kanji_grade"("value");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
