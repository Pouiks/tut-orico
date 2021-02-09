const db = require('../database');

class Tutorial {
    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        };
    };

    static async findAllTutos() {
        const tutorials = await db.query(`
        SELECT tutorial.*,"user"."nick_name", category.category_name, difficulty.difficulty_name FROM "tutorial" 
        LEFT JOIN "category" ON "tutorial".category_id = "category".id  
        JOIN "difficulty" ON "difficulty".id = "tutorial".difficulty_id
        RIGHT JOIN "user" ON "user".id = "tutorial".user_id
        WHERE "isShow" = true ORDER BY id DESC;

        `);
        return tutorials.rows;
    };
    
    // static async findOneTuto(id){

    // };
    
    static async headTuto(id){
        const tutorialHead = await db.query(`
        SELECT tutorial.*, "user"."nick_name", category.category_name, difficulty.difficulty_name FROM "tutorial" 
        JOIN "category" ON "tutorial".category_id = "category".id  
        JOIN "difficulty" ON "difficulty".id = "tutorial".difficulty_id
        JOIN "user" ON "user".id = "tutorial".user_id
        JOIN "tutorial_have_material" ON "tutorial_have_material".tutorial_id = tutorial.id 
        JOIN "step" ON "step".tutorial_id = "tutorial".id
        JOIN "material" ON "material".id = "tutorial_have_material".material_id
        WHERE "tutorial".id = $1 ;
        `, [id]);
        // console.log("TUTORIAL DANS LE MODAL",tutorial.rows)
        return tutorialHead.rows[0];
    };
    
    static async materialsTuto(id){
        const tutorialBody = await db.query(`
        select tutorial_have_material.*, material.name 
        FROM tutorial_have_material
        JOIN material ON material.id = tutorial_have_material.material_id
        WHERE tutorial_id = $1;
        `, [id]);

        return tutorialBody.rows;
    };

    static async stepsTuto(id){
        const tutorialFooter = await db.query(`
        select * from step where tutorial_id = $1;
        `, [id]);
        return tutorialFooter.rows;
    };


    static async findIsShowFalse() {
        const tutorials = await db.query(`
        SELECT tutorial.*,"user"."nick_name", category.category_name, difficulty.difficulty_name FROM "tutorial" 
        LEFT JOIN "category" ON "tutorial".category_id = "category".id  
        JOIN "difficulty" ON "difficulty".id = "tutorial".difficulty_id
        RIGHT JOIN "user" ON "user".id = "tutorial".user_id
        WHERE "isShow" = false; ;
        `);
        return tutorials.rows;
    };

    static async isShowToTrue(id){
        const tutorial = await db.query(`
        UPDATE "tutorial" SET "isShow" = true WHERE id = $1;`, [id]);
        return tutorial.rows[0];
    };
    
    static async desactivateTuto(id){
        const tutorial = await db.query(`
        UPDATE "tutorial" SET "isShow" = false WHERE id = $1;`, [id]);
        return tutorial.rows[0];
    };


    static async uploadTutoImage(fileName, id){
        const imageUrl = await db.query(
            `UPDATE "tutorial" SET tutorial_image = $1 WHERE id = $2`,
             [
                 fileName,
                 id
            ]
        )
        return imageUrl.rows[0]
    };

    static async findCategory(id) {
        const tutorials = await db.query(`
        SELECT tutorial.*,"user"."nick_name", category.category_name, difficulty.difficulty_name FROM "tutorial" 
        LEFT JOIN "category" ON "tutorial".category_id = "category".id  
        JOIN "difficulty" ON "difficulty".id = "tutorial".difficulty_id
        RIGHT JOIN "user" ON "user".id = "tutorial".user_id
        WHERE category_id = $1 AND "isShow" = true;
        `, [id]);
        return tutorials.rows;
    };

    static async lastTuto() {
        const lastTuto = await db.query(`
        SELECT tutorial.*,"user"."nick_name", category.category_name, difficulty.difficulty_name FROM "tutorial" 
        LEFT JOIN "category" ON "tutorial".category_id = "category".id  
        JOIN "difficulty" ON "difficulty".id = "tutorial".difficulty_id
        RIGHT JOIN "user" ON "user".id = "tutorial".user_id
        WHERE "isShow" = true ORDER BY tutorial.id DESC LIMIT 3;
            `
        );
        return lastTuto.rows;
    };

    async create (info) {
        const newOne = await db.query(`
        INSERT INTO "tutorial" ("title","creation_date","user_id","category_id","difficulty_id", "description" ) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id ;`,
        [
            info.title,
            "NOW()",
            info.user_id,
            info.category_id,
            info.difficulty_id,
            info.description

        ]);
        return newOne.rows[0];
    };

    static async delete(id) {
        const deleteTutoWithMaterial = await db.query(`
        DELETE FROM "tutorial_have_material" WHERE tutorial_id = $1;
        `, [id]);
        await db.query(`DELETE FROM "tutorial" WHERE id= $1;`, [id]);
    } ;


};

module.exports = Tutorial;





// TEST 

/* 
    async findByCategory(name) {
        const tutorials = await db.query(`
        SELECT tutorial.*, "user"."nick_name", category.category_name, difficulty.difficulty_name FROM "tutorial" 
        JOIN "category" ON "tutorial".category_id = "category".id  
        JOIN "difficulty" ON "difficulty".id = "tutorial".difficulty_id
        JOIN "user" ON "user".id = "tutorial".user_id
        JOIN "tutorial_have_material" ON "tutorial_have_material".tutorial_id = tutorial.id 
        JOIN "step" ON "step".tutorial_id = "tutorial".id
        JOIN "material" ON "material".id = "tutorial_have_material".material_id
        WHERE "tutorial".id = $1 ;
        `, [name]);
        return tutorials.rows;
    };

*/