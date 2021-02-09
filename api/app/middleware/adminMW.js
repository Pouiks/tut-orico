const adminMW = (request, response, next) => {
    if (!request.session.user) {
        //l'utilisateur n'est pas connecté
        response.redirect('/');
    } else if (request.session.user.info.role !== 'admin') {
        //l'utilisateur n'a pas les droits admin
        response.render('401');
    } else {
        //l'utilisateur est bien admin
        next();
    }
};

module.exports = adminMW;



