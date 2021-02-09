const Tutorial = require('../models/tutorial');
const Difficulty = require('../models/difficulty');
const Category = require('../models/category');
const Material = require('../models/material');
const Step = require('../models/step');



const tutorialController = {

    home: async (request, response) => {
        try {

            const lastTuto = await Tutorial.lastTuto()
            response.status(200).json({
                lastTuto
            });
        } catch (error) {
            console.error(error);
            response.status(500).json('Requete invalide ou tutoriels introuvable');
        }
    },

    findAll: async (request, response) => {
        try {
            const tutorials = await Tutorial.findAllTutos()
            response.status(200).json({
                tutorials
            });
        } catch (error) {
            console.trace(error);
            response.status(400).json("Le tuto n'a pas été trouvé");
        }
    },

    tutoWhoNeedValidate: async (request, response) => {
        try {
            const needValidate = await Tutorial.findIsShowFalse();
            response.status(200).json({
                needValidate
            });
        } catch (err) {
            console.error(err);
            response.status(500).json('Aucun tuto en attente de validation apparement')
        }
    },

    validateTuto: async (request, response) => {
        try {
            const id = request.params.id;
            const validate = await Tutorial.isShowToTrue(id);

            response.status(200).send('Tuto maintenant en ligne');

        } catch (err) {
            console.log(err);
            response.status(500).send("Apparement il y a eu un probleme");
        }
    },

    desactivate: async (request, response) => {
        try {
            const id = request.params.id;
            const desactivate = await Tutorial.desactivateTuto(id);
            if (!desactivate) {
                response.status(200).send(`probleme sur l\'ID.`);
            } else {
                response.status(200).send(`tuto ${id} hors ligne`);
            }
        } catch (err) {
            console.error(err);
            response.status(500).send('Le tuto n\'est pas désactivé');
        }
    },

    findOne: async (request, response) => {
        try {
            console.log(request.params);
            const id = request.params.id;
            const headTutorial = await Tutorial.headTuto(id);
            const materialsTuto = await Tutorial.materialsTuto(id);
            const stepsTuto = await Tutorial.stepsTuto(id);
            console.log(headTutorial);
            // if (headTutorial ) {
                response.status(200).json({
                    headTutorial,
                    materialsTuto,
                    stepsTuto
                });
            // } else {
            //     response.status(500).json("y'a eu un probleme Johny");
            // }
        } catch (error) {
            console.error("Ce tutoriel n'existe pas", error);
            response.status(404).json("Ce tutoriel n'existe pas")
        }
    },


    findByCategory: async (request, response) => {
        try {
            console.log("REQUEST : ",request.params.id)
            const id = request.params.id
            const tutorials = await Tutorial.findCategory(id);
            if (tutorials) {
                response.status(200).json({
                    tutorials
                })
            }
        } catch (error) {
            console.trace(error);
            response.status(400).json("La catégorie n'existe pas");
        }
    },


    
    
    uploadingTutorialImage: async (request, response) => {
        try {
            const {
                file
            } = request;
            console.log(file)
            console.log(__dirname);
            console.log("detectedFileExtension : ", file.detectedFileExtension)
            const fileName = Math.floor(Math.random() * 1000) + file.detectedFileExtension;
            console.log("JE SUIS FILENAME", fileName);

            await pipeline(file.stream, fs.createWriteStream(`${__dirname}/../public/image/${fileName}`));
            const url = `/image/${fileName}`;

            const id = request.body.user_id;
            console.log(id);
            await Tutorial.uploadTutoImage(url, id);
            response.status(200).json({message: "Photo mis a jour"})
        } catch (error) {
            console.error(error);
            response.status(400).json({
                error: "Probleme dans la requete. "
            })
        }
    },


    createFullTuto: async (request, response) => {
        try {
            const tutorial = new Tutorial(request.body);
            const newTutoId = await tutorial.create({
                title: request.body.title,
                user_id: request.body.user_id,
                description: request.body.description,
                category_id: request.body.category,
                difficulty_id: request.body.difficulty,
                // tutorial_image: request.body.image

            });
            // ici
            // CHECKING TUTO CREATION
            console.log("JE SUIS NEW ID ", newTutoId);
            console.log("JE SUIS TUTORIAL ", tutorial);
            if (!tutorial) {
                console.log(error)
                response.status(400).json({
                    error: "Le tuto n'a pas été crée"
                })
            } else {


                // IF TUTO CREATED, NEXT => MATERIALS
                // materials.forEach(async (material) => {
                    const materials = request.body.tools;
                for (material of materials) {
                    const newMaterial = new Material(materials);
                    await Material.insertMaterials({
                        tutorial_id: newTutoId.id,
                        material_id: material.material_id,
                        quantity: material.quantity,
                        unit_measure: material.sizing_number,
                        comment: material.commentary,
                    })

                    console.log("JE SUIS MATERIAL", newMaterial);
                }
                // CHECKING MATERIALS INSERTED
                if (!materials) {
                    console.log(error)
                    response.status(400).json({
                        error: "Les materiaux n'ont pas été ajouté"
                    })
                } else {
                    // IF MATERIALS INSERTED, NEXT => STEPS
                    
                    const allSteps = request.body.steps;
                    console.log("Insertion ETAPE");
                    // allSteps.forEach(async (eachStep) => {
                    for (eachStep of allSteps) {
                        const step = new Step(eachStep);
                        await Step.insertNewStep({
                            name: eachStep.title,
                            step_img_url: eachStep.img_url,
                            description: eachStep.description,
                            tutorial_id: newTutoId.id
                        });
                        console.log("JE SUIS STEP", step);
                        if (!step) {
                            console.log(error)
                            response.status(400).json({
                                error: "L'étape n'a pas été ajouté"
                            })
                        }
                    }

                    // CHECKING STEP CREATION
                }

            }

        response.status(200).json("je recois les valeurs");
        }
        catch (error) {
            console.error(error);
            response.status(400).json({
                error: "Mauvaise facon de faire pour créer un tutoriel. "
            });
        }
    },

createtutoList: async (request, response) => {
        try {
            const categories = await Category.categoryList();
            const difficulties = await Difficulty.findAll();
            const materials = await Material.findAll();
            response.status(200).json({
                categories: categories,
                difficulties: difficulties,
                materials: materials
            });
        } catch (err) {
            console.error(err);
        }
    },

    deleteTuto: async (request, response) => {
        try {
            const id = request.params.id;
            const tutoDeleted = await Tutorial.delete(id);
            response.status(200).send(`Le tuto ${id} à été supprimé `);
        } catch (err) {
            console.log(err);
            response.status(500).send(`Un probleme est survenu dans la suppression`)
        }
    }


};

module.exports = tutorialController;