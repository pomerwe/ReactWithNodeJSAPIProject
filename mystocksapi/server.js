'use strict';
var express = require('express'),
cors = require('cors'),
app = express(),

port = 4000;
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

var routes = require("./api/routes/routes")
routes(app)

app.listen(port);


console.log('API Server started on: ' + port)