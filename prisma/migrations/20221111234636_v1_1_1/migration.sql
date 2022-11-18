/*
  Warnings:

  - You are about to drop the column `order` on the `kanji_nanori` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `kanji_meaning` table. All the data in the column will be lost.
  - The primary key for the `cross_kanji_part` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `order` on the `cross_kanji_part` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `kanji_reading` table. All the data in the column will be lost.
  - Added the required column `position` to the `kanji_nanori` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `kanji_meaning` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `cross_kanji_part` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `kanji_reading` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_kanji_nanori" (
    "kanji_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    PRIMARY KEY ("kanji_id", "value"),
    CONSTRAINT "kanji_nanori_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_kanji_nanori" ("kanji_id", "value") SELECT "kanji_id", "value" FROM "kanji_nanori";
DROP TABLE "kanji_nanori";
ALTER TABLE "new_kanji_nanori" RENAME TO "kanji_nanori";
CREATE TABLE "new_kanji_meaning" (
    "kanji_id" INTEGER NOT NULL,
    "kwLang_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    PRIMARY KEY ("kanji_id", "kwLang_id", "value"),
    CONSTRAINT "kanji_meaning_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji_meaning_kwLang_id_fkey" FOREIGN KEY ("kwLang_id") REFERENCES "kw_kanji_lang" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_kanji_meaning" ("kanji_id", "kwLang_id", "value") SELECT "kanji_id", "kwLang_id", "value" FROM "kanji_meaning";
DROP TABLE "kanji_meaning";
ALTER TABLE "new_kanji_meaning" RENAME TO "kanji_meaning";
CREATE TABLE "new_cross_kanji_part" (
    "kanji_id" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "part_kanji_id" INTEGER,
    "part_radical_id" INTEGER,
    "part_component" TEXT,

    PRIMARY KEY ("kanji_id", "position"),
    CONSTRAINT "cross_kanji_part_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "cross_kanji_part_part_kanji_id_fkey" FOREIGN KEY ("part_kanji_id") REFERENCES "kanji" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "cross_kanji_part_part_radical_id_fkey" FOREIGN KEY ("part_radical_id") REFERENCES "radical" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_cross_kanji_part" ("kanji_id", "part_component", "part_kanji_id", "part_radical_id") SELECT "kanji_id", "part_component", "part_kanji_id", "part_radical_id" FROM "cross_kanji_part";
DROP TABLE "cross_kanji_part";
ALTER TABLE "new_cross_kanji_part" RENAME TO "cross_kanji_part";
CREATE TABLE "new_kanji_reading" (
    "kanji_id" INTEGER NOT NULL,
    "kwKanjiReadingType_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    PRIMARY KEY ("kanji_id", "kwKanjiReadingType_id", "value"),
    CONSTRAINT "kanji_reading_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji_reading_kwKanjiReadingType_id_fkey" FOREIGN KEY ("kwKanjiReadingType_id") REFERENCES "kw_kanji_readingtype" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_kanji_reading" ("kanji_id", "kwKanjiReadingType_id", "value") SELECT "kanji_id", "kwKanjiReadingType_id", "value" FROM "kanji_reading";
DROP TABLE "kanji_reading";
ALTER TABLE "new_kanji_reading" RENAME TO "kanji_reading";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
