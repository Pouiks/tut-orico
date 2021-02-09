BEGIN;

DROP TABLE IF EXISTS  "tutorial" CASCADE;
DROP TABLE IF EXISTS  "material" CASCADE;
DROP TABLE IF EXISTS  "tool" CASCADE;
DROP TABLE IF EXISTS  "difficulty" CASCADE;
DROP TABLE IF EXISTS  "category" CASCADE;
DROP TABLE IF EXISTS  "step" CASCADE;
DROP TABLE IF EXISTS  "state" CASCADE;
DROP TABLE IF EXISTS  "event" CASCADE;

CREATE TABLE "user" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name TEXT NULL,
    last_name TEXT NULL,
    nick_name TEXT NULL,
    mail TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    tel TEXT NULL,
    city TEXT NULL,
    postal_code TEXT NULL,
    image_url TEXT NULL
);

CREATE TABLE "material" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE "tool" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE "difficulty" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    color TEXT NOT NULL
);

CREATE TABLE "category" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    category_img_url TEXT NOT NULL UNIQUE

);

CREATE TABLE "step" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    step_img_url TEXT NULL

);

CREATE TABLE "state" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name TEXT NOT NULL,
    comment TEXT NULL
);

CREATE TABLE "event" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    adress TEXT NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    category_id INT NOT NULL REFERENCES "category"(id),
    state_id INT NOT NULL REFERENCES "state"(id)
);

CREATE TABLE "tutorial" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    rank INT NULL,
    category_id INT NOT NULL REFERENCES "category"(id),
    difficulty_id INT NOT NULL REFERENCES "difficulty"(id),
    user_id INT NOT NULL REFERENCES "user"(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    
);

CREATE TABLE "tutorial_have_tool" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tool_id INT NOT NULL REFERENCES "tool"(id),
    tutorial_id INT NOT NULL REFERENCES "tutorial"(id)
) ;

CREATE TABLE "tutorial_have_material" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    material_id INT NOT NULL REFERENCES "material"(id),
    tutorial_id INT NOT NULL REFERENCES "tutorial"(id)
);

CREATE TABLE "tutorial_have_event" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tutorial_id INT NOT NULL REFERENCES "tutorial"(id),
    event_id INT NOT NULL REFERENCES "event"(id)
);

GRANT ALL PRIVILEGES ON "tutorial", "material", "tool", "difficulty", "category", "step", "state", "event" TO admindiy;

COMMIT;



