//import express intro project
const express = require('express');

//create a router for the accounts resource
const AccountRouter = require('./Accounts/Acccounts_Router.js');

//create the server using express
const server = express();

//convert data to JSON using middleware
server.use(express.json());

//hook up the router to server
server.use('/api/accounts', AccountRouter);

server.get('/', (req, res) => {
    res.send('<h3>Accounts API</h3>');
  });
  

module.exports = server;