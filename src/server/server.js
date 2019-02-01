const Dfp = require('node-google-dfp');
const {JWT} = require('google-auth-library');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('../../config.json');
const os = require('os');
const cors = require('cors');
const request = require('request');
const port = process.env.EXPRESS_PORT || 8080;
const app = express();
const jwtClient = new JWT(config.serviceAccountEmail, config.prebidKey , null, ['https://www.googleapis.com/auth/dfp']);
const dfpUser = new Dfp.User(config.networkCode, config.appName, config.version);
const moment = require('moment-timezone')


dfpUser.setClient(jwtClient);
let now = moment().tz('America/Los_Angeles').format()
// console.log(now)

// console.log("NYtime", moment.locale().tz('America/New_York').format('ha z'))
// console.log("LA time", moment(Date.now).tz('America/Los_Angeles').format('ha z'))
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


module.exports.dfpUser = dfpUser

app.listen(8080, () => console.log('Listening on port 8080!'));
