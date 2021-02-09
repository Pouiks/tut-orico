
// Validateur générique de req.body et req.query : version simplifiée

const validate = (schema) => async (req, res, next) => {
    // Si il y'a un body à la request, la source est req.body. Autrement, utilise la query : 
    let source = Object.keys(req.body).length !== 0 ? req.body : req.query;
    
    // Nous n'utilisons pas de routes avec query.

    // JOI validate fn 
    const result = await schema.validate(source, {
        abortEarly : false, // Retourne toutes les erreurs (ne s'arrette pas à la première)
        stripUnknown : true, // Echappe les keys inconnues
        convert : true // Parse (du moins essaye) la value le cas échéant 
    });

    // schema.validate retourne un objet result.error
    if (result.error) {
        const errorArray = [];
        // Si cet objet contient de multiples erreurs...
        if (Object.keys(result.error.details).length > 1) {
            i = 0;
            // ... ittère pour ...
            for (const err in result.error.details) {
                // formater les objets d'indication d'erreurs et stock les dans un tableau
                errorArray.push(
                    // key: result.error.details[i].context.key,
                    // message: result.error.details[i].message
                    result.error.details[i].message
                ); 
                i++;
            };

         } else {
            // Dans le cas d'une seule erreur, formate-là tel quel :
            errorArray.push(
                // key: result.error.details[0].context.key,
                // message: result.error.details[0].message
                result.error.details.message
            );
        };
        
        return res.status(400).json(errorArray);

        // Si absence d'erreur, passe au mdw suivant :
    } else next();
};

module.exports = validate;


