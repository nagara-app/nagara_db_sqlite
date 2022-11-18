-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_kanji_dicref" (
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
INSERT INTO "new_kanji_dicref" ("kanji_id", "kwDicRefType_id", "kwMorohashiVol_id", "mPage", "value") SELECT "kanji_id", "kwDicRefType_id", "kwMorohashiVol_id", "mPage", "value" FROM "kanji_dicref";
DROP TABLE "kanji_dicref";
ALTER TABLE "new_kanji_dicref" RENAME TO "kanji_dicref";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
