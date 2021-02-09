const bcrypt = require('bcrypt');

// Fonction de hashage bcrypt :
const hashPassword = (password) => {
    const saltRounds = 5;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
};

// Fonction de comparaison. Retourn true si valide, et inversement.
const checkPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};

module.exports = {
    hashPassword,
    checkPassword
};