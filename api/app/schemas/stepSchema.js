const Joi = require('Joi');

const stepSchema = Joi.object({
    name : Joi.string()
    .min(2)
    .max(50)
    .require()
    .message({
        'string.base': ` name doit etre de type STRING`,
        'any.require': `name est obligatoire`,
        'string.min': `Le name doit être composé de minimum {#limit} caractères.`,
        'string.max': `Le name doit être composé de maximum {#limit} caractères.`,
    }),

    step_img_url :Joi.string()
    .message({
        'string.base' : `Title doit etre de type STRING`
    }),
});

module.exports = stepSchema;