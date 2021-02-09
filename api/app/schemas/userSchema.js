const Joi = require('joi');


const userSchema = Joi.object({
    first_name : Joi.string()
        .messages({
            'string.base': `First_name doit être de type 'STRING.`
        }),
    
    name : Joi.string()
        .messages({
            'string.base' : ` Name doit etre de type "STRING.`
        }),
    
    nick_name : Joi.string(),
    //     .required()
    //     .messages({
    //         'string.base' : ` nick_name doit etre de type "STRING.`,
    //         'any.required' : 'nick_name est obligatoire.'
    // }),

    email :Joi.string()
        .email()
        .required()
        .messages({
            'string.base' : ` mail doit etre de type "STRING.`,
            'any.required' :  `L'email est obligatoire`,
            'string.email' : "L'email est invalide"
        }),

    password: Joi.string()
        .required()
        .pattern(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/)
        .messages({  
            'string.base': `Le mot de passe doit être de type 'String'.`,
            "any.required": "Le mot de passe est obligatoire.",
            "string.pattern": 'Le mot de passe doit être composé de 8 caractères minimum, dont une minuscule au moins, une majuscule au moins, un nombre au moins, et un caractère spécial parmis : !@#$%^&* .'
        }), 

    city :Joi.string()
        .messages({
            'string.base' : ` city doit etre de type "STRING.`
    }),

    tel : Joi.string()
        .messages({
            'string.base' : ` tel doit etre de type "STRING.`
        }),

    role :Joi.string()
        .required()
        .messages({
            'string.base' : ` nick_name doit etre de type "STRING.`,
            "any.required": "Le role est obligatoire.",
        }),

    postal_code :Joi.string()
        .messages({
            'string.base' : ` postal_code doit etre de type "STRING.`
        }),

    image_url : Joi.string()
        .messages({
            'string.base' : ` image_url doit etre de type "STRING.`
        }),

});

const createdUserSchema = userSchema.keys({
    password: Joi.string()
        .required()
        .messages({  
            'string.base': `[dev-only] Le mot de passe doit être de type 'String'.`,
            "any.required": "Le mot de passe est obligatoire.",
            "string.pattern": 'Le mot de passe doit être composé de 8 caractères minimum, dont une minuscule au moins, une majuscule au moins, un nombre au moins, et un caractère spécial parmis : !@#$%^&* .'
        }), 
});

module.exports = {
    userSchema,
    createdUserSchema
};