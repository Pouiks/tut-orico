const db = require('../database');

class Category {
    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        };
    };

    static async categoryList() {
        const categories = await db.query(`
            SELECT * FROM "category" ;
        `);
        return categories.rows;
    };
    
};

module.exports = Category;