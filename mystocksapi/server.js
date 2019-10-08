var connection = require("./database/connection")

const express = require('express'),
app = express(),
port = 4000;
const bodyParser = require('body-parser');

app.listen(port);


console.log('API Server started on: ' + port);