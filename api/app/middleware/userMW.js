const userMW = (request, response, next) => {
    if (!request.session.user) {
        request.session.user = false;
    }
    response.locals.user = request.session.user;

    next();
};

module.exports = userMW;