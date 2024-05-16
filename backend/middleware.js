const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('./config');

//Middleware for handling auth
function authMiddleware(req,res,next ){
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decodedValue = jwt.verify(jwtToken,JWT_SECRET);
    if(decodedValue){
        req.user = jwtToken;
        req.userId = decodedValue.userId;
        next();
    }
    else{
        res.status(403).json({
            msg: "You are not authenticated"
        })
    }
}

module.exports = authMiddleware;
