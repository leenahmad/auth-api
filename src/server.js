'use strict';

const express = require('express');
const cors = require('cors')
const bcrypt = require('bcrypt');

const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');


const basicAuth = require('./auth/middleware/basic')
const bearerAuth = require('./auth/middleware/bearerAuth')
const {User} = require('./auth/models/index')
// const UserModel = require('./auth/models/bearer.model')

const acl = require('./auth/middleware/acl.js')

const app = express();

app.use(express.json());

app.use(cors());


app.post('/signup' , signup);
app.post('/signin', basicAuth(User), signinHandler);
app.get('/secret', bearerAuth(User), userHandler);
app.get('/user' , bearerAuth(User) , readAcl);
app.post('/user' , bearerAuth(User) , createAcl);
app.put('/user' , bearerAuth(User) , updateAcl);
app.delete('/user' , bearerAuth(User) , deleteAcl);

// async function signup(req, res) {
//     let { username, password } = req.body;
//     console.log(`${username} and ${password}`);
//     try {
//         let hashedPassword = await bcrypt.hash(password, 5);
//         console.log('after hashing >>> ', hashedPassword)
//         const newUser = await User.create({
//             username: username,
//             password: hashedPassword
//         })
//         res.status(201).json(newUser);
//     } catch (error) {
//         console.log(error)
//     }
// }

async function signup(req, res) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 5);
        const record = await User.create(req.body);
        res.status(201).json(record);
    } catch (error) {
        res.status(403).send("Error occurred");
    }
}

function signinHandler(req, res) {
    res.status(200).json(req.user);
}

function userHandler(req, res) {
    res.status(200).json(req.user);
}

function readAcl(req, res){
    res.send('nowwww you can read acl');
   
}
function createAcl(req , res){
    res.send('the acl was created ');
   
}
function updateAcl(req, res){
    res.send('the acl updated');
  
}
function deleteAcl(req , res){
    res.send('the acl deleted');
    
}

app.get('/' , (req,res) =>{
    res.send('home route')
})

function start(port){
    
    app.listen(port, () =>{
        console.log(`running on port ${port}`)
    })
    
    } 

app.use(errorHandler);
app.use('*',notFound);

module.exports = {
    app: app,
    start: start,
}