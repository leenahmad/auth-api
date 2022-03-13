'use strict';

const  User  = require("../models/index");


module.exports = (User) =>async (req,res,next)=>{
    if(req.headers['authorization']) {
        // 'Bearer token'
        let bearerHeaderParts= req.headers.authorization.split(' ');
        console.log('bearerHeaderParts > ',bearerHeaderParts); 
        let token = bearerHeaderParts.pop(); 
        console.log('Token >>> ',token);
       
        User.validateToken(token).then(user=>{
            req.user = user;
            next();
        }).catch(error=>next(`invalid user ${error}`));
    }
}

// module.exports = UserModel;/