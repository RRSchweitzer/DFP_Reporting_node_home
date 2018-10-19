
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
      	res.status(200).json(results);
      })
		})			
	}
}









