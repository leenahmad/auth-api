'use strict';
const base64 = require('base-64');

const {User} = require('../models/index')


// module.exports = (User) => (req,res,next)=>{
//     if(req.headers['authorization']) {
//         let basicHeaderParts= req.headers.authorization.split(' ');
//         console.log('basicHeaderParts >>> ',basicHeaderParts);
//         let encodedPart = basicHeaderParts.pop(); //encoded(username:password)
//         console.log('encodedPart >>> ',encodedPart);
//         let decoded = base64.decode(encodedPart); //username:password
//         console.log('decoded >>> ',decoded);
//         let [username,password]= decoded.split(':'); //[username: password]
       
//         User.authenticateBasic(username,password).then(validUser=>{
//             req.user = validUser;
//             next();
//         }).catch(error=>next(`invalid user ${error}`));
//     }
// }

module.exports =(User) => async(req,res, next)  => {
    if(req.headers['authorization']) {
        let basicHeaderParts= req.headers.authorization.split(' ');
        console.log('basicHeaderParts >>> ',basicHeaderParts);
        let encodedPart = basicHeaderParts.pop(); 
        console.log('encodedPart >>> ',encodedPart);
        let decoded = base64.decode(encodedPart); 
        console.log('decoded >>> ',decoded);
        let [username,password]= decoded.split(':'); 
       

        User.authenticateBasic(username,password).then(validUser=>{
            req.user = validUser;
            next();
        }).catch(error=>next(`invalid user ${error}`));
    }
 }
