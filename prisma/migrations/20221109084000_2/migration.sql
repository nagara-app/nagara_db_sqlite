/*
  Warnings:

  - You are about to drop the `cross.kanji.part` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kanji.antonym` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kanji.dicref` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kanji.lookalike` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kanji.meaning` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kanji.misc` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kanji.misc.rad` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kanji.nanori` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kanji.querycode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kanji.reading` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kanji.synonym` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kanji.variant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kw.kanji.codepointtype` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kw.kanji.dicref` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kw.kanji.grade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kw.kanji.jlpt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kw.kanji.lang` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kw.kanji.morohashivol` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kw.kanji.querycodetype` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kw.kanji.radicaltype` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kw.kanji.readingtype` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kw.kanji.skipmisclass` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kw.kanji.strokecount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `radical.meaning` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `radical.reading` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `radical.variant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "kanji.misc_kanji_id_key";

-- DropIndex
DROP INDEX "kanji.misc.rad_value_key";

-- DropIndex
DROP INDEX "kw.kanji.codepointtype_value_key";

-- DropIndex
DROP INDEX "kw.kanji.dicref_value_key";

-- DropIndex
DROP INDEX "kw.kanji.grade_value_key";

-- DropIndex
DROP INDEX "kw.kanji.jlpt_value_key";

-- DropIndex
DROP INDEX "kw.kanji.lang_value_key";

-- DropIndex
DROP INDEX "kw.kanji.morohashivol_value_key";

-- DropIndex
DROP INDEX "kw.kanji.querycodetype_value_key";

-- DropIndex
DROP INDEX "kw.kanji.radicaltype_value_key";

-- DropIndex
DROP INDEX "kw.kanji.readingtype_value_key";

-- DropIndex
DROP INDEX "kw.kanji.skipmisclass_value_key";

-- DropIndex
DROP INDEX "kw.kanji.strokecount_value_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "cross.kanji.part";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "kanji.antonym";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "kanji.dicref";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "kanji.lookalike";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "kanji.meaning";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "kanji.misc";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "kanji.misc.rad";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "kanji.nanori";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "kanji.querycode";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "kanji.reading";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "kanji.synonym";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "kanji.variant";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "kw.kanji.codepointtype";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "kw.kanji.dicref";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "kw.kanji.grade";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "kw.kanji.jlpt";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "kw.kanji.lang";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "kw.kanji.morohashivol";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "kw.kanji.querycodetype";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "kw.kanji.radicaltype";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "kw.kanji.readingtype";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "kw.kanji.skipmisclass";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "kw.kanji.strokecount";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "radical.meaning";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "radical.reading";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "radical.variant";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "kanji_misc" (
    "kanji_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "grade_id" INTEGER,
    "strokeCount_id" INTEGER NOT NULL,
    "jlpt_id" INTEGER,
    "freq" INTEGER,
    CONSTRAINT "kanji_misc_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji_misc_grade_id_fkey" FOREIGN KEY ("grade_id") REFERENCES "kw_kanji_grade" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji_misc_strokeCount_id_fkey" FOREIGN KEY ("strokeCount_id") REFERENCES "kw_kanji_strokecount" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji_misc_jlpt_id_fkey" FOREIGN KEY ("jlpt_id") REFERENCES "kw_kanji_jlpt" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "kanji_dicref" (
    "kanji_id" INTEGER NOT NULL,
    "kwDicRefType_id" INTEGER NOT NULL,
    "kwMorohashiVol_id" INTEGER,
    "mPage" INTEGER,
    "value" TEXT NOT NULL,

    PRIMARY KEY ("kanji_id", "kwDicRefType_id"),
    CONSTRAINT "kanji_dicref_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji_dicref_kwDicRefType_id_fkey" FOREIGN KEY ("kwDicRefType_id") REFERENCES "kw_kanji_dicref" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji_dicref_kwMorohashiVol_id_fkey" FOREIGN KEY ("kwMorohashiVol_id") REFERENCES "kw_kanji_morohashivol" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "kanji_querycode" (
    "kanji_id" INTEGER NOT NULL,
    "kwQueryCodeType_id" INTEGER NOT NULL,
    "kwSkipMisclass_id" INTEGER,
    "value" TEXT NOT NULL,

    PRIMARY KEY ("kanji_id", "kwQueryCodeType_id"),
    CONSTRAINT "kanji_querycode_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji_querycode_kwQueryCodeType_id_fkey" FOREIGN KEY ("kwQueryCodeType_id") REFERENCES "kw_kanji_querycodetype" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji_querycode_kwSkipMisclass_id_fkey" FOREIGN KEY ("kwSkipMisclass_id") REFERENCES "kw_kanji_skipmisclass" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "kanji_reading" (
    "kanji_id" INTEGER NOT NULL,
    "kwKanjiReadingType_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    PRIMARY KEY ("kanji_id", "kwKanjiReadingType_id", "value"),
    CONSTRAINT "kanji_reading_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji_reading_kwKanjiReadingType_id_fkey" FOREIGN KEY ("kwKanjiReadingType_id") REFERENCES "kw_kanji_readingtype" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "kanji_meaning" (
    "kanji_id" INTEGER NOT NULL,
    "kwLang_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    PRIMARY KEY ("kanji_id", "kwLang_id", "value"),
    CONSTRAINT "kanji_meaning_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji_meaning_kwLang_id_fkey" FOREIGN KEY ("kwLang_id") REFERENCES "kw_kanji_lang" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "kanji_nanori" (
    "kanji_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    PRIMARY KEY ("kanji_id", "value"),
    CONSTRAINT "kanji_nanori_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "kanji_variant" (
    "kanji_id" INTEGER NOT NULL,
    "kanji_variant_id" INTEGER NOT NULL,

    PRIMARY KEY ("kanji_id", "kanji_variant_id"),
    CONSTRAINT "kanji_variant_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji_variant_kanji_variant_id_fkey" FOREIGN KEY ("kanji_variant_id") REFERENCES "kanji" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "kanji_lookalike" (
    "kanji_id" INTEGER NOT NULL,
    "kanji_lookalike_id" INTEGER NOT NULL,

    PRIMARY KEY ("kanji_id", "kanji_lookalike_id"),
    CONSTRAINT "kanji_lookalike_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji_lookalike_kanji_lookalike_id_fkey" FOREIGN KEY ("kanji_lookalike_id") REFERENCES "kanji" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "kanji_antonym" (
    "kanji_id" INTEGER NOT NULL,
    "kanji_antonym_id" INTEGER NOT NULL,

    PRIMARY KEY ("kanji_id", "kanji_antonym_id"),
    CONSTRAINT "kanji_antonym_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji_antonym_kanji_antonym_id_fkey" FOREIGN KEY ("kanji_antonym_id") REFERENCES "kanji" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "kanji_synonym" (
    "kanji_id" INTEGER NOT NULL,
    "kanji_synonym_id" INTEGER NOT NULL,

    PRIMARY KEY ("kanji_id", "kanji_synonym_id"),
    CONSTRAINT "kanji_synonym_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji_synonym_kanji_synonym_id_fkey" FOREIGN KEY ("kanji_synonym_id") REFERENCES "kanji" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "kanji_misc_rad" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kanjiMisc_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    CONSTRAINT "kanji_misc_rad_kanjiMisc_id_fkey" FOREIGN KEY ("kanjiMisc_id") REFERENCES "kanji_misc" ("kanji_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "radical_reading" (
    "radical_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    PRIMARY KEY ("radical_id", "value"),
    CONSTRAINT "radical_reading_radical_id_fkey" FOREIGN KEY ("radical_id") REFERENCES "radical" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "radical_meaning" (
    "radical_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    PRIMARY KEY ("radical_id", "value"),
    CONSTRAINT "radical_meaning_radical_id_fkey" FOREIGN KEY ("radical_id") REFERENCES "radical" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "radical_variant" (
    "radical_id" INTEGER NOT NULL,
    "radical_variant_id" INTEGER NOT NULL,

    PRIMARY KEY ("radical_id", "radical_variant_id"),
    CONSTRAINT "radical_variant_radical_id_fkey" FOREIGN KEY ("radical_id") REFERENCES "radical" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "radical_variant_radical_variant_id_fkey" FOREIGN KEY ("radical_variant_id") REFERENCES "radical" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "kw_kanji_codepointtype" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "kw_kanji_radicaltype" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "kw_kanji_grade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "kw_kanji_strokecount" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "kw_kanji_jlpt" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "kw_kanji_dicref" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "kw_kanji_morohashivol" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "kw_kanji_querycodetype" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "kw_kanji_skipmisclass" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "kw_kanji_readingtype" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "kw_kanji_lang" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "cross_kanji_part" (
    "kanji_id" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "part_kanji_id" INTEGER,
    "part_radical_id" INTEGER,
    "part_component" TEXT,

    PRIMARY KEY ("kanji_id", "order"),
    CONSTRAINT "cross_kanji_part_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "cross_kanji_part_part_kanji_id_fkey" FOREIGN KEY ("part_kanji_id") REFERENCES "kanji" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "cross_kanji_part_part_radical_id_fkey" FOREIGN KEY ("part_radical_id") REFERENCES "radical" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_kanji.codepoint" (
    "kanji_id" INTEGER NOT NULL,
    "kw_codepoint_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    PRIMARY KEY ("kanji_id", "kw_codepoint_id"),
    CONSTRAINT "kanji.codepoint_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji.codepoint_kw_codepoint_id_fkey" FOREIGN KEY ("kw_codepoint_id") REFERENCES "kw_kanji_codepointtype" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_kanji.codepoint" ("kanji_id", "kw_codepoint_id", "value") SELECT "kanji_id", "kw_codepoint_id", "value" FROM "kanji.codepoint";
DROP TABLE "kanji.codepoint";
ALTER TABLE "new_kanji.codepoint" RENAME TO "kanji.codepoint";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "kanji_misc_kanji_id_key" ON "kanji_misc"("kanji_id");

-- CreateIndex
CREATE UNIQUE INDEX "kanji_misc_rad_value_key" ON "kanji_misc_rad"("value");

-- CreateIndex
CREATE UNIQUE INDEX "kw_kanji_codepointtype_value_key" ON "kw_kanji_codepointtype"("value");

-- CreateIndex
CREATE UNIQUE INDEX "kw_kanji_radicaltype_value_key" ON "kw_kanji_radicaltype"("value");

-- CreateIndex
CREATE UNIQUE INDEX "kw_kanji_grade_value_key" ON "kw_kanji_grade"("value");

-- CreateIndex
CREATE UNIQUE INDEX "kw_kanji_strokecount_value_key" ON "kw_kanji_strokecount"("value");

-- CreateIndex
CREATE UNIQUE INDEX "kw_kanji_jlpt_value_key" ON "kw_kanji_jlpt"("value");

-- CreateIndex
CREATE UNIQUE INDEX "kw_kanji_dicref_value_key" ON "kw_kanji_dicref"("value");

-- CreateIndex
CREATE UNIQUE INDEX "kw_kanji_morohashivol_value_key" ON "kw_kanji_morohashivol"("value");

-- CreateIndex
CREATE UNIQUE INDEX "kw_kanji_querycodetype_value_key" ON "kw_kanji_querycodetype"("value");

-- CreateIndex
CREATE UNIQUE INDEX "kw_kanji_skipmisclass_value_key" ON "kw_kanji_skipmisclass"("value");

-- CreateIndex
CREATE UNIQUE INDEX "kw_kanji_readingtype_value_key" ON "kw_kanji_readingtype"("value");

-- CreateIndex
CREATE UNIQUE INDEX "kw_kanji_lang_value_key" ON "kw_kanji_lang"("value");
