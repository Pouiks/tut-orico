const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

module.exports = {
    generateTokenForUser : (userData) => {
        return jwt.sign({
            user_id: userData.id,
            user_email: userData.email,
            user_role: userData.role
        },
        ACCESS_TOKEN_SECRET, 
        {
            expiresIn : '1h'
        }
        )
    }, 

    verifyToken : (request, response, next) => {
        var token = request.headers.authorization;
        console.log(token);
                var jwtToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
                if(jwtToken){
                    next();
                }
          
        
    },




};
