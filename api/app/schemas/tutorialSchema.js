const Joi = require('joi');

const tutorialSchema = Joi.object({

    title : Joi.string()
        .required()
        .message({
            'string.base' : `Title doit etre de type STRING`,
            'any.required' : `Title est obligatoire`
        }),
    
    creation_date: Joi.date(),

    user_id : Joi.number()
        .integer()
        .required()
        .message({
            'number.base' : `user_id doit etre de type NUMBER`,
            'number_integer': `user_id doit etre de type INTEGER`,
            'any.required' : `user_id est obligatoire`
        }),

    category_id : Joi.number()
    .integer()
    .required()
    .message({
        'number.base' : `category_id doit etre de type NUMBER`,
        'number_integer': `category_id doit etre de type INTEGER`,
        'any.required' : `category_id est obligatoire`
    }),

    difficulty_id : Joi.number()
    .integer()
    .required()
    .message({
        'number.base' : `difficulty_id doit etre de type NUMBER`,
        'number_integer': `difficulty_id doit etre de type INTEGER`,
        'any.required' : `difficulty_id est obligatoire`
    }),


        

}).unknown(true);;

module.exports = tutorialSchema;