const Dfp = require('node-google-dfp');
const {JWT} = require('google-auth-library');

const getAllKeys = () => {
  return new Promise ((resolve, reject) => {
    // const jwtClient = new JWT(config.serviceAccountEmail, config.prebidKey , null, ['https://www.googleapis.com/auth/dfp']);
    dfpUser = new Dfp.User(config.networkCode, config.appName, config.version);
    dfpUser.setClient(jwtClient);
    dfpUser.getService('CustomTargetingService', (err, CustomTargetingService) => {
      if (err) {
        console.error(err);
        reject(ERROR('An error occurred with DFP API:  ' + err))
      }
      const values = [{
          'key': 'type',
          'value': {
              'xsi_type': 'TextValue',
              'value': 'FREEFORM'
          }
      }]
      const query = 'WHERE type = type'
      const statement = Dfp.Statement(query)
      let keys = "";
      CustomTargetingService.getCustomTargetingKeysByStatement(statement, (err, results) => {
        let keys = "";
        if (err) {
          reject(ERROR('An error occurred with DFP API:  ' + err))
        } else {
          resolve(results.rval.results);
        }
      });
    });
  })
}

let keyNameArr = [];
const getKeyNames =() => {
  return getAllKeys().then(result => {
    for (let i = 0; i < result.length; i++) {
      if (result[i].name.split('_')[0] === "hb" || result[i].name.split('_')[0] === "rpfl") {
        keyNameArr.push(result[i].name)
      }
    }
    return keyNameArr
  }, err => {
      console.log(err); 
  })
}

module.exports = {
  getKeys: (req, res) => {
    console.log(req)
    //path to file you're serving
    let keyNames = [];
    getKeyNames()
    .then(keys => {
      res.status(200).json(keys);
      // res.send(keys)
    }, function(err){
      res.status(500).json(err);
    })
  }
}


