const db = require('../database');

class User {
    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        };
    };
    static async findAll() {
        const users = await db.query(`
            SELECT * FROM "user" ORDER BY id ASC;
        `);
        return users.rows;
    };
    // Get user by ID
    static async findOne(element) {
        const user = await db.query(`
            SELECT * FROM "user" 
            WHERE id = $1;`, [ element ]
        );
        console.log(user.rows[0]);
        return user.rows[0];
    };

    static async adminFindOne(element) {
        const user = await db.query(`
            SELECT * FROM "user" 
            WHERE id = $1;`, [element]
        );
        // console.log(user.rows[0]);
        return user.rows;
    };
// Get user by mail
    static async findByEmail(email) {
        const userByEmail = await db.query(`
            SELECT * FROM "user" 
            WHERE email = $1;`,[ email ]
        );
        return userByEmail.rows[0];
    };
        
    static async AdminFindByEmail(email) {
        const userByEmail = await db.query(`
            SELECT * FROM "user" 
            WHERE email LIKE $1;`,[ email + '%']
        );

        return userByEmail.rows;
    };
    
    static async loginByEmail(email) {
        const userByEmail = await db.query(`
            SELECT * FROM "user" 
            WHERE email = $1;`,[ email ]
        );

        return userByEmail.rows[0];
    };
    
    static async findByNickName(nickName) {
        const userBynickName = await db.query(`
            SELECT * FROM "user" 
            WHERE nick_name LIKE $1;`, ['%' + nickName + '%']
        );

        return userBynickName.rows;
    };
// Insert user in DB
    async create (info) {
        
        const newOne = await db.query(`
        INSERT INTO "user" ("first_name","name","nick_name","email","password","city","tel","role","postal_code","image_url" ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id ;`,
        [
            info.first_name,
            info.name,
            info.nick_name,
            info.email,
            info.password,
            info.city,
            info.tel,
            info.role,
            info.postal_code,
            info.image_url
        ]);
        if (newOne.rowCount) {
            this.id = newOne.rows[0].id;
        }
    };

    static async update(user) {
        
        if(user.id){
        const updateUser = await db.query(`
            UPDATE "user" SET first_name = $1 , name = $2 , city = $3 ,tel = $4 , postal_code = $5 ,image_url = $6 WHERE id = $7 RETURNING * ;
        `,[
            user.first_name,
            user.name,
            user.city,
            user.tel,
            user.postal_code,
            user.image_url,
            user.id

        ]);
        return updateUser.rows[0];
    }
    };

// RECUPERATION DE L'EMAIL
    static async updateEmail(user, newEmail){
        if(user.id){
            const updatedEmail = await db.query(`
            UPDATE "user" SET email = $1 WHERE email = $2 RETURNING *;
            `, [
                newEmail,
                user.id
            ]);
            return updatedEmail.rows[0];
        }
    };

// CHANGEMENT DU MOT DE PASSE
    async updatePassword(user, newPassword){
        if(user.password){
            const updatedPassword = await db.query(`
            UPDATE "user" SET password = $1 WHERE id = $2 RETURNING *;
            `, [
                newPassword,
                user.id
            ]);
            return updatedPassword.rows[0];
        }
    };

    static async uploadFile(fileName, id){
        const imageUrl = await db.query(
            `UPDATE "user" SET image_url = $1 WHERE id = $2`,
             [
                 fileName,
                 id
            ]
        )
        return imageUrl.rows[0]
    }; 
    


    async updateNickname(id, new_nick_name){
        if(user.id){
            const updatedNickname = await db.query(`
            UPDATE "user" SET nick_name = $1 WHERE id = $2 RETURNING *;
            `,[
                id,
                new_nick_name
            ]);
            return updatedNickname.rows[0];
        }   
    };

    async getAll(userId) {
        const getAll = await db.query(`
        SELECT * FROM "tutorial"
        LEFT JOIN "user"
        ON "user".id = "tutorial".user_id
        WHERE user_id = $1; 
        `, [userId]) 
        return getAll.rows[0];
    };

    static async delete(id) {
        const user = await db.query(`
            DELETE FROM "user"
            WHERE id = $1`, [id]);
    };
    
};

module.exports = User;




// RECUPERATION DE L'EMAIL

/* 
Changement d'email, apres confirmation de l'ancien mot de passe
*/

// CHANGEMENT DU MOT DE PASSE

/* 
Ancien mot de passe
Nouveau 
confirmation
*/

// CHANGEMENT DU NICK_NAME

/* 
Nouveau nick_name
verification avec le mot de passe 
*/
 