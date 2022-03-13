'use strict';

require('dotenv').config();

const server = require('./src/server.js');
const {db} = require('./src/auth/models/index.js');
// console.log('hahabJH' , db)

db.sync().then(() => {
    server.start(process.env.PORT || 3001)
})

.catch(console.error)

// server.start(process.env.PORT || 3001);