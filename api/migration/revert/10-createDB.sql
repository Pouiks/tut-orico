-- Revert apodiy:10-createDB from pg

BEGIN;

    DROP TABLE IF EXISTS "material", "difficulty", "step", "category", "user", "tutorial", "tutorial_have_material" CASCADE;

COMMIT;
