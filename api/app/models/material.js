const db = require('../database');

class Material {
    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        };
    };

    // Recuperer la totalité des materiaux
    static async findAll(){
        const materials = await db.query(`
        SELECT * FROM material;
        `);
        return materials.rows;
    };
     // Recuperer un material par son name (USELESS)
    static async findByName(name){
        const materials = await db.query(`
        SELECT * FROM material where name LIKE '%$1%';
        `, [name])
        return materials.rows ;
    };

    static async insertMaterials(material){
        const newStep = await db.query(`
            INSERT INTO "tutorial_have_material" ("tutorial_id", "material_id", "quantity", "unit_measure", "comment") VALUES ($1, $2, $3, $4, $5) RETURNING *;
        `, [
            material.tutorial_id,
            material.material_id,
            material.quantity,
            material.unit_measure,
            material.comment
        ]);
        return newStep.rows[0];
    };


}

module.exports = Material;

/* 
select tutorial.*, thm.*, material.* from "tutorial" 
JOIN "tutorial_have_material" as thm ON "thm".tutorial_id = "tutorial".id
LEFT JOIN "material" ON material.id = thm.material_id 
WHERE tutorial.id = 78 GROUP BY tutorial.id, thm.id, material.id;
*/


// select * from "tutorial_have_material";