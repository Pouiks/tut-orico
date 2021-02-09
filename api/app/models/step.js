const db = require('../database');

class Step {
    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        };
    };

    static async insertNewStep(step){
        const newStep = await db.query(`
            INSERT INTO "step" ("name", "step_img_url", "tutorial_id", "description") VALUES ($1, $2, $3, $4) RETURNING *;
        `, [
            step.name,
            step.step_img_url,
            step.tutorial_id,
            step.description,
        ]);
        return newStep.rows[0];
    }
}

    module.exports = Step;