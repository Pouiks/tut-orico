const Material = require('../models/material');

const materialController = {

    findAll : async (request, response) => {
        try{
            const materials = await Material.findAll();
            if(materials){
                response.status(200).json({materials});
            }
        } catch(error){
            console.trace(error);
            response.status(500).json("Aucun materiel n'a été trouvé");
        }
    },

    findByName : async (request, response) => {
        try {
            const name = request.body.name
            const materialByName = await materialController.findByName(name);
            if(materialByName){
                response.status(200).json({
                    materialByName
                });
            };
        }catch(error){
            console.trace(error);
            response.status(400).json("Aucun materiel correspondant");
        }
    },
}

module.exports = materialController;