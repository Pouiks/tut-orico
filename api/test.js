// STEP
// ``` sql
//  id | name | step_img_url | tutorial_id | description 
// ```

const tutorialController = require("./app/controllers/tutorialController")

// TUTORIAL
// ```sql 
//  id | title | creation_date | user_id | isShow | category_id | difficulty_id | material 
//  ```

//  USER
//  ```sql 
//   id | first_name | name | nick_name | email| password |  city   | tel  | role  | postal_code | image_url   
//   ```

// TUTORIAL_HAVE_MATERIAL
// ```sql
//  id | tutorial_id | material_id | quantity | unit_measure | comment 
// ```




// INSERT INTO "step" ("name", "step_image_url", "tutorial_id", "description") VALUES ($1, $2, $3, $4)

// INSERT INTO "tutorial_have_material" ("tutorial_id, "material_id", "quantity", "unit_measure", "comment") VALUES ($3, $6, $7, $8, $9)


// INSERT INTO "tutorial" ("title", user_id, "category_id", "difficulty_id) VALUES ($10, $11, $12, $13)


// JE creer le tutorial 
//     `INSERT INTO "tutorial" ("title", user_id, "category_id", "difficulty_id) VALUES (...)`

// Je met les materiaux
// materials.forEach(element => {
//     `INSERT INTO "tutorial_have_material" ("tutorial_id, "material_id", "quantity", "unit_measure", "comment") VALUES (...)`
// })

// for(element in steps){
//     for( step in element){
//          `INSERT INTO "step" ("name", "step_image_url", "tutorial_id", "description") VALUES (...)`
//     }
// }
// Je creer les étape 
// steps.forEach(step => {
   
// })



// SELECT * FROM "tutorial" 
// JOIN "step" ON step.tutorial_id = tutorial.id
// JOIN "tutorial_have_material" AS t ON t.tutorial_id = tutorial.id 
// WHERE tutorial.id = 1;


// SELECT tutorial.*
// FROM "tutorial"
// JOIN "tutorial_have_material" ON "tutorial_have_material".tutorial_id = "tutorial".id
// JOIN "user" ON "user".id = "tutorial".user_id
// JOIN "material" ON "material".id = "tutorial".material_id
// GROUP BY "tutorial".id, "tutorial".user_id; 

// let min = 300;
// let max = 320;
// function getRandomInt(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }
// getRandomInt(min, max);


// DELETE FROM "tutorial" JOIN "tutorial_have_material" TO "tutorial_have_material".id = "tutorial".id JOIN "step" TO "step".tutorial_id = "tutorial".id WHERE id = 60;

('Eau'),
('Fécule de maïs'),
('Vis'),
('Huile'),
('Cendres'),
('Gants'),
('Tissu'),
('Saladier'),
('Isolant phonique‎ '),
('Isolant thermique‎'),
('Papier peint‎'),
('Pâte à modeler‎ '),
('Linoleum'),
('Cheville'),
('Vaseline'),
('Savon'),
('Savon (de Marseille)'),
('Bicarbonate de soude'),
('Vinaigre blanc'),
('Boulon'),
('Carré Robertson'),
('Cheville (assemblage)'),
('Clé Allen'),
('Clé Torx'),
('Désignation des vis'),
('Écrou'),
('Écrou cage'),
('Écrou hexagonal'),
('Excentrique (visserie)'),
('Ferrure'),
('Filetage carré'),
('Filetage d’artillerie'),
('Filetage en dents de scie'),
('Filetage externe'),
('Filetage gaz'),
('Filetage métrique'),
('Filetage rond'),
('Filetage trapézoïdal'),
('Filetage unifié'),
('Goujon (mécanique)'),
('Pas de vis'),
('Rondelle (mécanique)'),
('Rondelle fendue'),
('Rondelle ressort'),
('Six pans creux'),
('Snake-eye'),
('Spudger'),
('Tige filetée'),
('Tire-fond'),
('Torq-set'),
('Tournevis'),
('Tri-Wing'),
('Trou de passage'),
('Vis à tête hexagonale'),
('Vis à tôle'),
('Vis cruciforme'),
('Vis de fixation'),
('Vis de pression'),
('Vis fendue'),
('Vis pour boîtier de PC'),
('Vis Pozidriv'),
('Vis quart de tour'),
('Sable'),
('Farine')