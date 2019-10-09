'use strict';
var connection = require("./database/connection")
var express = require('express'),
app = express(),
port = 4000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require("./api/routes/routes");
routes(app);

app.use('/', routes);
app.listen(port);


console.log('API Server started on: ' + port);