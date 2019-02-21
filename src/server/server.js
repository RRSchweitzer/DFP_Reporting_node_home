const express = require('express');
const bodyParser = require('body-parser');
const os = require('os');
const cors = require('cors');
const request = require('request');
const port = process.env.EXPRESS_PORT || 8080;
const app = express();
const moment = require('moment-timezone')

var corsOptions = {
	origin: (origin, callback) =>  {
	  callback(null, true)
	}
}

//controllers
const keysCtrl = require('./lib/controllers/keysCtrl.js');
const reportCtrl = require('./lib/controllers/reportCtrl');
const networkCtrl = require('./lib/controllers/networkCtrl');
const paCtrl = require('./lib/controllers/paCtrl');

//middleware
app.use(cors(corsOptions))
app.use(express.static(__dirname + '/Public'));
app.use(bodyParser.json());

// Endpoints
app.use(express.static('dist'));
app.get('/api/getNetworks', networkCtrl.getNetworks);
app.get('/api/getKeys', keysCtrl.getKeys);
app.post('/api/pullReporting', reportCtrl.pullReporting);
app.post('/api/pullPAReporting', paCtrl.getPaData);
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

// module.exports.dfpUser = dfpUser

app.listen(8080, () => console.log('Listening on port 8080!'));
