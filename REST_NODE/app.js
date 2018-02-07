const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//REQUIRE ROUTES
const ep1Routes = require('./api/routes/ep1');
const ep2Routes = require('./api/routes/ep2');

mongoose.connect('mongodb://localhost:27017/<Example Template>', {useMongoClient: true});
mongoose.Promise = global.Promise;

//CORS HANDLING 
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	if(req.method === 'OPTIONS'){
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

//REQUEST ROUTE HANDLERS
app.use('/ep1', ep1Routes);
app.use('/ep2', ep2Routes);

//ERROR HANDLING - 404
app.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

//ALL OTHER ERROR HANDLING
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;