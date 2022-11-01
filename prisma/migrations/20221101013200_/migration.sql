-- CreateTable
CREATE TABLE "kanji" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "literal" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "kanji.codepoint" (
    "kanji_id" INTEGER NOT NULL,
    "kw_codepoint_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    PRIMARY KEY ("kanji_id", "kw_codepoint_id"),
    CONSTRAINT "kanji.codepoint_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji.codepoint_kw_codepoint_id_fkey" FOREIGN KEY ("kw_codepoint_id") REFERENCES "kw.kanji.codepointtype" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "kanji.misc" (
    "kanji_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "grade_id" INTEGER,
    "strokeCount_id" INTEGER NOT NULL,
    "jlpt_id" INTEGER,
    "freq" INTEGER,
    CONSTRAINT "kanji.misc_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji.misc_grade_id_fkey" FOREIGN KEY ("grade_id") REFERENCES "kw.kanji.grade" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji.misc_strokeCount_id_fkey" FOREIGN KEY ("strokeCount_id") REFERENCES "kw.kanji.strokecount" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji.misc_jlpt_id_fkey" FOREIGN KEY ("jlpt_id") REFERENCES "kw.kanji.jlpt" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "kanji.dicref" (
    "kanji_id" INTEGER NOT NULL,
    "kwDicRefType_id" INTEGER NOT NULL,
    "kwMorohashiVol_id" INTEGER,
    "mPage" INTEGER,
    "value" TEXT NOT NULL,

    PRIMARY KEY ("kanji_id", "kwDicRefType_id"),
    CONSTRAINT "kanji.dicref_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji.dicref_kwDicRefType_id_fkey" FOREIGN KEY ("kwDicRefType_id") REFERENCES "kw.kanji.dicref" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji.dicref_kwMorohashiVol_id_fkey" FOREIGN KEY ("kwMorohashiVol_id") REFERENCES "kw.kanji.morohashivol" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "kanji.querycode" (
    "kanji_id" INTEGER NOT NULL,
    "kwQueryCodeType_id" INTEGER NOT NULL,
    "kwSkipMisclass_id" INTEGER,
    "value" TEXT NOT NULL,

    PRIMARY KEY ("kanji_id", "kwQueryCodeType_id"),
    CONSTRAINT "kanji.querycode_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji.querycode_kwQueryCodeType_id_fkey" FOREIGN KEY ("kwQueryCodeType_id") REFERENCES "kw.kanji.querycodetype" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji.querycode_kwSkipMisclass_id_fkey" FOREIGN KEY ("kwSkipMisclass_id") REFERENCES "kw.kanji.skipmisclass" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "kanji.reading" (
    "kanji_id" INTEGER NOT NULL,
    "kwKanjiReadingType_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    PRIMARY KEY ("kanji_id", "kwKanjiReadingType_id", "value"),
    CONSTRAINT "kanji.reading_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji.reading_kwKanjiReadingType_id_fkey" FOREIGN KEY ("kwKanjiReadingType_id") REFERENCES "kw.kanji.readingtype" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "kanji.meaning" (
    "kanji_id" INTEGER NOT NULL,
    "kwLang_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    PRIMARY KEY ("kanji_id", "kwLang_id", "value"),
    CONSTRAINT "kanji.meaning_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji.meaning_kwLang_id_fkey" FOREIGN KEY ("kwLang_id") REFERENCES "kw.kanji.lang" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "kanji.nanori" (
    "kanji_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    PRIMARY KEY ("kanji_id", "value"),
    CONSTRAINT "kanji.nanori_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "kanji.variant" (
    "kanji_id" INTEGER NOT NULL,
    "kanji_variant_id" INTEGER NOT NULL,

    PRIMARY KEY ("kanji_id", "kanji_variant_id"),
    CONSTRAINT "kanji.variant_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji.variant_kanji_variant_id_fkey" FOREIGN KEY ("kanji_variant_id") REFERENCES "kanji" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "kanji.lookalike" (
    "kanji_id" INTEGER NOT NULL,
    "kanji_lookalike_id" INTEGER NOT NULL,

    PRIMARY KEY ("kanji_id", "kanji_lookalike_id"),
    CONSTRAINT "kanji.lookalike_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji.lookalike_kanji_lookalike_id_fkey" FOREIGN KEY ("kanji_lookalike_id") REFERENCES "kanji" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "kanji.antonym" (
    "kanji_id" INTEGER NOT NULL,
    "kanji_antonym_id" INTEGER NOT NULL,

    PRIMARY KEY ("kanji_id", "kanji_antonym_id"),
    CONSTRAINT "kanji.antonym_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji.antonym_kanji_antonym_id_fkey" FOREIGN KEY ("kanji_antonym_id") REFERENCES "kanji" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "kanji.synonym" (
    "kanji_id" INTEGER NOT NULL,
    "kanji_synonym_id" INTEGER NOT NULL,

    PRIMARY KEY ("kanji_id", "kanji_synonym_id"),
    CONSTRAINT "kanji.synonym_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji.synonym_kanji_synonym_id_fkey" FOREIGN KEY ("kanji_synonym_id") REFERENCES "kanji" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "kanji.misc.rad" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kanjiMisc_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    CONSTRAINT "kanji.misc.rad_kanjiMisc_id_fkey" FOREIGN KEY ("kanjiMisc_id") REFERENCES "kanji.misc" ("kanji_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "radical" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "literal" TEXT NOT NULL,
    "literal_" TEXT,
    "stroke_count" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "is_variant" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "radical.reading" (
    "radical_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    PRIMARY KEY ("radical_id", "value"),
    CONSTRAINT "radical.reading_radical_id_fkey" FOREIGN KEY ("radical_id") REFERENCES "radical" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "radical.meaning" (
    "radical_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    PRIMARY KEY ("radical_id", "value"),
    CONSTRAINT "radical.meaning_radical_id_fkey" FOREIGN KEY ("radical_id") REFERENCES "radical" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "radical.variant" (
    "radical_id" INTEGER NOT NULL,
    "radical_variant_id" INTEGER NOT NULL,

    PRIMARY KEY ("radical_id", "radical_variant_id"),
    CONSTRAINT "radical.variant_radical_id_fkey" FOREIGN KEY ("radical_id") REFERENCES "radical" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "radical.variant_radical_variant_id_fkey" FOREIGN KEY ("radical_variant_id") REFERENCES "radical" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "kw.kanji.codepointtype" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "kw.kanji.radicaltype" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "kw.kanji.grade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "kw.kanji.strokecount" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "kw.kanji.jlpt" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "kw.kanji.dicref" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "kw.kanji.morohashivol" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "kw.kanji.querycodetype" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "kw.kanji.skipmisclass" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "kw.kanji.readingtype" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "kw.kanji.lang" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "cross.kanji.part" (
    "kanji_id" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "part_kanji_id" INTEGER,
    "part_radical_id" INTEGER,
    "part_component" TEXT,

    PRIMARY KEY ("kanji_id", "order"),
    CONSTRAINT "cross.kanji.part_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "cross.kanji.part_part_kanji_id_fkey" FOREIGN KEY ("part_kanji_id") REFERENCES "kanji" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "cross.kanji.part_part_radical_id_fkey" FOREIGN KEY ("part_radical_id") REFERENCES "radical" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "kanji_literal_key" ON "kanji"("literal");

-- CreateIndex
CREATE UNIQUE INDEX "kanji.misc_kanji_id_key" ON "kanji.misc"("kanji_id");

-- CreateIndex
CREATE UNIQUE INDEX "kanji.misc.rad_value_key" ON "kanji.misc.rad"("value");

-- CreateIndex
CREATE UNIQUE INDEX "radical_literal_key" ON "radical"("literal");

-- CreateIndex
CREATE UNIQUE INDEX "kw.kanji.codepointtype_value_key" ON "kw.kanji.codepointtype"("value");

-- CreateIndex
CREATE UNIQUE INDEX "kw.kanji.radicaltype_value_key" ON "kw.kanji.radicaltype"("value");

-- CreateIndex
CREATE UNIQUE INDEX "kw.kanji.grade_value_key" ON "kw.kanji.grade"("value");

-- CreateIndex
CREATE UNIQUE INDEX "kw.kanji.strokecount_value_key" ON "kw.kanji.strokecount"("value");

-- CreateIndex
CREATE UNIQUE INDEX "kw.kanji.jlpt_value_key" ON "kw.kanji.jlpt"("value");

-- CreateIndex
CREATE UNIQUE INDEX "kw.kanji.dicref_value_key" ON "kw.kanji.dicref"("value");

-- CreateIndex
CREATE UNIQUE INDEX "kw.kanji.morohashivol_value_key" ON "kw.kanji.morohashivol"("value");

-- CreateIndex
CREATE UNIQUE INDEX "kw.kanji.querycodetype_value_key" ON "kw.kanji.querycodetype"("value");

-- CreateIndex
CREATE UNIQUE INDEX "kw.kanji.skipmisclass_value_key" ON "kw.kanji.skipmisclass"("value");

-- CreateIndex
CREATE UNIQUE INDEX "kw.kanji.readingtype_value_key" ON "kw.kanji.readingtype"("value");

-- CreateIndex
CREATE UNIQUE INDEX "kw.kanji.lang_value_key" ON "kw.kanji.lang"("value");
