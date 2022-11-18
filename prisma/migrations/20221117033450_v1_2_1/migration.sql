-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_kanji_querycode" (
    "kanji_id" INTEGER NOT NULL,
    "kwQueryCodeType_id" INTEGER NOT NULL,
    "kwSkipMisclass_id" INTEGER,
    "value" TEXT NOT NULL,

    PRIMARY KEY ("kanji_id", "kwQueryCodeType_id"),
    CONSTRAINT "kanji_querycode_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji_querycode_kwQueryCodeType_id_fkey" FOREIGN KEY ("kwQueryCodeType_id") REFERENCES "kw_kanji_querycodetype" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji_querycode_kwSkipMisclass_id_fkey" FOREIGN KEY ("kwSkipMisclass_id") REFERENCES "kw_kanji_skipmisclass" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_kanji_querycode" ("kanji_id", "kwQueryCodeType_id", "value") SELECT "kanji_id", "kwQueryCodeType_id", "value" FROM "kanji_querycode";
DROP TABLE "kanji_querycode";
ALTER TABLE "new_kanji_querycode" RENAME TO "kanji_querycode";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
