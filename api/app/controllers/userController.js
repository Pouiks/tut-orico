const User = require('../models/user');
const jwt = require('../services/jwt');
// const {checkPassword, hashPassword} = require('../services/password');
const bcrypt = require('bcrypt');
var validator = require("email-validator");
const {
    json
} = require('body-parser');
const {
    promisify
} = require('util');
const pipeline = promisify(require("stream").pipeline);
const fs = require("fs");



const userController = {

    // Find user by ID
    findOne: async (request, response) => {
        try {
            const id = request.params.id;
            const user = await User.findOne(id);
            if (user) {
                response.status(200).json(
                    user
                );
            }else {
                response.status(400).json({error:"id inexistante"})
            }
        } catch (error) {
            console.error("Cet utilisateur n'existe pas.", error);
            response.status(404).json("Cet utilisateur n'existe pas.")
        }
    },
    
    findOneAdmin: async (request, response) => {
        try {
            const id = request.params.id;
            const user = await User.adminFindOne(id);
            if (user) {
                response.status(200).json({
                    user
                });
            }
        } catch (error) {
            console.error("Cet utilisateur n'existe pas.", error);
            response.status(404).json("Cet utilisateur n'existe pas.")
        }
    },

    findAll: async (request, response) => {
        const allUsers = await User.findAll();
        response.status(200).json({
            users: allUsers
        });

    },

    findByEmail: async (request, response) => {
        try {
            const email = request.params.email;
            const user = await User.findByEmail(email);
            if (user) {
                response.status(200).json({
                    user
                })
            } else {
                response.status(400).json({error:"Email inexistant"})
            }
        } catch (err) {
            console.trace("Aucun utilisateur avec cet email correspondant .", error);
            response.status(404).json('Aucun utilisateur avec cet email correspondant.');
        }
    }, 
    
    adminTofindByEmail: async (request, response) => {
        try {
            const email = request.params.email;
            const user = await User.AdminFindByEmail(email);
            if (user) {
                response.status(200).json({
                    user
                })
            } else {
                response.status(400).json({error:"Email inexistant"})
            }
        } catch (err) {
            console.trace("Aucun utilisateur avec cet email correspondant .", error);
            response.status(404).json('Aucun utilisateur avec cet email correspondant.');
        }
    },
    
    findByPseudo: async (request, response) => {
        try {
            const nick_name = request.params.nick_name;
            const user = await User.findByNickName(nick_name);
            if (user) {
                response.status(200).json({
                    user
                })
            } else {
                response.status(400).json({error:"Pseudo inexistant"})
            }
        } catch (err) {
            console.trace("Aucun utilisateur avec ce pseudo correspondant .", error);
            response.status(404).json('Aucun utilisateur avec ce pseudo correspondant.');
        }
    },

    profil: async (request, response) => {
        try {
            const userId = request.body.id;
            const profil = await User.getAll(userId);
            if (profil) {
                response.status(200).json({
                    profil
                });
            }
        } catch (error) {
            response.status(404).json("L'utilisateur n'existe pas.");
        }
    },

    updateUser: async (request, response) => {
        try {
            const user = request.body;
            await User.update(user);
            response.status(200).json({
                user,
                message: "Profil mis à jours."
            });
        } catch (err) {
            console.error(err);
            response.status(400).json({
                message: 'Il y a eu un probleme dans l\'update.'
            });
        }
    },
    // creation of a user
    createOneUser: async (request, response) => {
        try {
            const password = request.body.password;
            const email = request.body.email;
            if (validator.validate(email)) {
                const userEmail = await User.findByEmail(email)
                if (userEmail) {
                    return response.status(409).json("L'Email existe déja.");
                }
                bcrypt.hash(password, 5, function (error, bcryptPassword) {
                    const user = new User(request.body);
                    console.log(new User(user));
                    user.create({
                        first_name: request.body.first_name,
                        name: request.body.name,
                        nick_name: request.body.nick_name,
                        email: request.body.email,
                        password: bcryptPassword,
                        city: request.body.city,
                        tel: request.body.tel,
                        role: "user",
                        postal_code: request.body.postal_code,
                        image_url: request.body.image_url
                    });
                    response.json({
                        message: `Utilisateur ${user.email} Créée.`
                    });
                });
            } else {
                response.status(403).json({
                    error: "Format email invalide"
                });
            };


        } catch (error) {
            console.error(error);
            response.status(400).json("L'adresse mail utilisé existe déja.");
        }
    },
    // log a user 
    login: async (request, response) => {

        const email = request.body.email;
        const password = request.body.password;
        console.log(password);

        if (email == null || password == null) {
            return response.status(400).json({
                'Error': "Il manque l'email ou le password."
            });
        }
        const user = await User.loginByEmail(email);
        if (!user) {
            return response.status(404).json({
                'error': 'Aucune adresse mail correspondante en BDD.'
            })
        } else {

            // If crypt password match, return the user with token
            bcrypt.compare(password, user.password, function (errBycrypt, resByCrypt) {
                if (resByCrypt) {
                    response.status(200).json({
                        user,
                        'user_id': user.id,
                        'token': jwt.generateTokenForUser(user),

                    })
                    // console.log(response);



                } else {
                    return response.status(403).json({
                        'error': "Mot de passe invalide."
                    });
                }
            })
        }

    },

    uploadingImage: async (request, response) => {
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
            await User.uploadFile(url, id);
            response.status(200).json({message: "Photo mis a jour"})
        } catch (error) {
            console.error(error);
            response.status(400).json({
                error: "Probleme dans la requete. "
            })
        }
    },
    

    
    updatingEmail: async (request, response) => {
        const email = request.body.email;
        const newEmail = request.body.newEmail;
        const id = request.body.id;
        const password = request.body.password;
        if (email == null || password == null) {
            return response.status(400).json({
                'Error': "Il manque l'email ou le password."
            });
        }
        const user = await User.findByEmail(email);
        if (!user) {
            return response.status(404).json({
                'error': 'Aucune adresse mail correspondante en BDD.'
            })
        } else {
            bcrypt.compare(password, user.password, function (errByCrypt, resByCrypt) {
                if (resByCrypt) {
                    user.updateEmail(email, newEmail)
                    response.status(200).json({
                        email: user.email,
                        message: "Email mis à jours."
                    })
                }
            })
        }
    },

    updatingPassword: async (request, response) => {
        const id = request.body.id;
        const password = request.body.password;
        const newPassword = request.body.newPassword;

        if (password == newPassword) {
            return response.status(400).json({
                error: "Le mot de passe correspond à un ancien mot de passe, changez le."
            })
        }
        const user = await User.findById(id)
        if (!user) {
            return response.status(400).json({
                error: "Aucun utilisateur n'a été trouvé."
            })
        } else {
            bcrypt.compare(password, user.password, function (errByCrypt, resByCrypt) {
                if (resByCrypt) {
                    bcrypt.hash(newPassword, 5, function (error, bcryptnewPassword) {
                        user.updatePassword(user, newPassword)
                        response.status(200).json({

                            message: "Le mot de passe à été mis à jours."
                        })
                    })
                }

            })
        }
    },

    updatingNickname: async (request, response) => {
        try {
            const user = await User.findOne(request.body.id);
            console.log(user);
            // const password = hashPassword(request.body.password, 5);
            const password = bcrypt.compareSync(request.body.password, user.password);
            console.log(password);
            if (user.id) {
                if (password) {

                    user.updateNickname(request.body.id, request.body.nick_name);
                    response.status(200).json("Le pseudo a été mis à jour .");

                } else {
                    response.status(400).json("Il manque le mot de passe .")
                }
            }

        } catch (error) {
            console.error(error);
            response.status(500).json({
                message: "erreur interne"
            });
        }
    },



    logOut: async (request, response) => {
        if (request.session.user.isLogged) {
            request.session.destroy(() => {
                response.status(200).json({
                    isLogged: false
                });
            });
        } else {
            response.status(404).json(`Aucun utilisateur connecté.`);
        }
    },


    isLogged: (request, response) => {
        response.status(200).json({
            isLogged: request.session.user.isLogged,
            session: request.session.user
        });
    },

    delete: async (request, response) => {
        try {
            const id = request.params.id;
            console.log(id);
            const user = await User.findOne(id);
            if (!user) {
                response.status(500).json(`Cette id n'existe pas`);
            } else {
                await User.delete(id);
                response.status(200).json(`Votre compte a bien été supprimé.`);
            };
        } catch (error) {
            response.status(403).json(`Oups ! Une erreur s'est produite, votre compte n'a pas été supprimé.`);
        }
    }

}

module.exports = userController;
