const Dfp = require('node-google-dfp');
const {JWT} = require('google-auth-library');
const config = require('../../../../config.json');
const jwtClient = new JWT(config.serviceAccountEmail, config.prebidKey , null, ['https://www.googleapis.com/auth/dfp']);
const dfpUser = new Dfp.User(config.networkCode, config.appName, config.version);

dfpUser.setClient(jwtClient);

module.exports = {
  getNetworks: (req, res) => {
    dfpUser.getService('NetworkService', (err, NetworkService) => {
      if (err) {
        console.error(err);
        reject(ERROR('An error occurred with DFP API:  ' + err))
      }
      NetworkService.getAllNetworks((err, results) => {
      	if (err) {
        	res.status(500).json(err);
	      }
        // console.log(results)
      	res.status(200).json(results);
      })
		})			
	}
}









