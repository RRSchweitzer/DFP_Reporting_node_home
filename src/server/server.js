const Dfp = require('node-google-dfp');
const {JWT} = require('google-auth-library');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('../../config.json');
const os = require('os');

const port = process.env.EXPRESS_PORT || 8080;
const app = express();

const jwtClient = new JWT(config.serviceAccountEmail, config.prebidKey , null, ['https://www.googleapis.com/auth/dfp']);
dfpUser = new Dfp.User(config.networkCode, config.appName, config.version);
dfpUser.setClient(jwtClient);

//controllers
const keysCtrl = require('./lib/controllers/keysCtrl.js');
const reportCtrl = require('./lib/controllers/reportCtrl');
const networkCtrl = require('./lib/controllers/networkCtrl');

//middleware
app.use(express.static(__dirname + '/Public'));
app.use(bodyParser.json());

// Endpoints
app.use(express.static('dist'));
app.get('/api/getNetworks', networkCtrl.getNetworks);
app.get('/api/getKeys', keysCtrl.getKeys);
app.get('/api/getReporting', reportCtrl.pullReporting);
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));


app.listen(8080, () => console.log('Listening on port 8080!'));
