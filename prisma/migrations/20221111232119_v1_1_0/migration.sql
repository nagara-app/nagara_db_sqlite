/*
  Warnings:

  - Added the required column `order` to the `kanji_nanori` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `kanji_meaning` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `kanji_reading` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_kanji_nanori" (
    "kanji_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

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
    "order" INTEGER NOT NULL,

    PRIMARY KEY ("kanji_id", "kwLang_id", "value"),
    CONSTRAINT "kanji_meaning_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji_meaning_kwLang_id_fkey" FOREIGN KEY ("kwLang_id") REFERENCES "kw_kanji_lang" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_kanji_meaning" ("kanji_id", "kwLang_id", "value") SELECT "kanji_id", "kwLang_id", "value" FROM "kanji_meaning";
DROP TABLE "kanji_meaning";
ALTER TABLE "new_kanji_meaning" RENAME TO "kanji_meaning";
CREATE TABLE "new_kanji_reading" (
    "kanji_id" INTEGER NOT NULL,
    "kwKanjiReadingType_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    PRIMARY KEY ("kanji_id", "kwKanjiReadingType_id", "value"),
    CONSTRAINT "kanji_reading_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji_reading_kwKanjiReadingType_id_fkey" FOREIGN KEY ("kwKanjiReadingType_id") REFERENCES "kw_kanji_readingtype" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_kanji_reading" ("kanji_id", "kwKanjiReadingType_id", "value") SELECT "kanji_id", "kwKanjiReadingType_id", "value" FROM "kanji_reading";
DROP TABLE "kanji_reading";
ALTER TABLE "new_kanji_reading" RENAME TO "kanji_reading";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
