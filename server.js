// Require express and create an instance of it
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var secrect = require('./dbsecrect.js');
var app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// const router = require('express').Router();

//Mongo connection
// mongoose.connect('mongodb://munna:m123456@ds263048.mlab.com:63048/ourfamily', { useNewUrlParser: true, useCreateIndex: true });
mongoose.connect(`mongodb://${secrect.userName}:${secrect.password}@ds263048.mlab.com:63048/ourfamily`, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo connection error:'));
db.once('open', function() {
  console.log('db connected!')
});

app.use(morgan('dev'))
app.use(cors())
// app.use(morgan('combined'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/v1/persons', require('./Route'));
app.use('/api/v1/familyperson', require('./familyperson_route'));
// app.use('/api/meterUnit', require('./api/routes/MeterUnit'));

//Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Change the 404 message modifing the middleware
app.use(function(req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

// start the server in the port 3000 !
app.listen(3000, function () {
    console.log('Example app listening on port 3000.');
});

module.exports = app;
