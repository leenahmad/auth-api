'use strict';

const {Sequelize, DataTypes} = require('sequelize'); // npm i pg sequelize
const User = require('./user.js');



// prepare the connection
const POSTGRES_URL =process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;



let sequelizeOptions =  process.env.NODE_ENV === 'production' ?{
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
  } : {};


let sequelize = new Sequelize(POSTGRES_URL,sequelizeOptions);
const UserModel = User(sequelize,DataTypes)

module.exports = {
    db: sequelize, //for real connection and will use it in index.js
    User: UserModel// for creating the table and will use it in our routes
   
}
