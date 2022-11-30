/*
  Warnings:

  - You are about to drop the `kw_kanji_jlpt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `jlpt_id` on the `kanji_misc` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "kw_kanji_jlpt_value_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "kw_kanji_jlpt";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "kw_kanji_jlpt_old" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "kw_kanji_jlpt_new" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" INTEGER NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_kanji_misc" (
    "kanji_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "grade_id" INTEGER,
    "strokeCount_id" INTEGER NOT NULL,
    "jlptOld_id" INTEGER,
    "jlptNew_id" INTEGER,
    "freq" INTEGER,
    CONSTRAINT "kanji_misc_kanji_id_fkey" FOREIGN KEY ("kanji_id") REFERENCES "kanji" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji_misc_grade_id_fkey" FOREIGN KEY ("grade_id") REFERENCES "kw_kanji_grade" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji_misc_strokeCount_id_fkey" FOREIGN KEY ("strokeCount_id") REFERENCES "kw_kanji_strokecount" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji_misc_jlptOld_id_fkey" FOREIGN KEY ("jlptOld_id") REFERENCES "kw_kanji_jlpt_old" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "kanji_misc_jlptNew_id_fkey" FOREIGN KEY ("jlptNew_id") REFERENCES "kw_kanji_jlpt_new" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_kanji_misc" ("freq", "grade_id", "kanji_id", "strokeCount_id") SELECT "freq", "grade_id", "kanji_id", "strokeCount_id" FROM "kanji_misc";
DROP TABLE "kanji_misc";
ALTER TABLE "new_kanji_misc" RENAME TO "kanji_misc";
CREATE UNIQUE INDEX "kanji_misc_kanji_id_key" ON "kanji_misc"("kanji_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "kw_kanji_jlpt_old_value_key" ON "kw_kanji_jlpt_old"("value");

-- CreateIndex
CREATE UNIQUE INDEX "kw_kanji_jlpt_new_value_key" ON "kw_kanji_jlpt_new"("value");
