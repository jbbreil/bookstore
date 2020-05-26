// Set upp the request statements 
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
cors = require('cors');

mongoose.connect('mongodb+srv://Admin:Password123@bookstoredb-gpebo.mongodb.net/bookstoredb?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
    console.log('Database connection is successful!');
});

/* IN ORDER TO RETRIVE THOSE REQUIRED INFORMATION FROM THIS FILE IT NEEDS TO BE EXPORT THE CREATED ROUTER 
   BY USING THE EXPORTS VARIABLE IN THE MODELS GLOBAL SCOPE VARIABLE (module.exports).
   BOTH STATEMENTS MUST BE HOOKED UP IN ORDER TO FUNCTION */

const indexRouter = require('./routes/index');

var app = express();

/* "Middleware".
Gör webbtjänsterna tillgängliga även från andra domäner 
*/
//tillåt anropning till webbtjänsten från andra källor node
app.all('/*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE"); // Tillåtelse verben 
	next();
});

app.use(cors());
// Use the refeer statements 
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// Set up Server on Horukos 
app.listen(process.env.PORT || 5000); // process.env.PORT || 3000 means: whatever is in the environment variable PORT, or 3000 if there's nothing there.
console.log('Running on port 5000...');

/* !IMPORTAT Hooking up the routes before any parsing middleware above in order to get the objects */
app.use('/', indexRouter); // Applications root and what router we want to handle in that route