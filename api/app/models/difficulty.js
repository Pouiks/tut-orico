const db = require('../database');

class Difficulty {
    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        };
    };

    static async findAll() {
        const difficulties = await db.query(`
            SELECT * FROM difficulty ;
        `);
        return difficulties.rows;
    };

    
};

module.exports = Difficulty;