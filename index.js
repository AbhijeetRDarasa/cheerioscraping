const express = require('express');
require('dotenv').config();
require('./route/app')
require('dotenv').config();

const app = express();

app.listen(process.env.APP_PORT, async () =>{console.log(`Debet gateway listening on port ${process.env.APP_PORT}!`);});