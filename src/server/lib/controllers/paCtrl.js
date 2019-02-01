const url = "https://api.rubiconproject.com/analytics/v1/report/"
const config = require('../../../../config.json');
const request = require('request')
const momentTimezone = require('moment-timezone')
var moment = require('moment');

const headers = {
'Content-Type': "application/json",
'Authorization': "Basic YjcyMTk1ZjBiNDM0YWFjNmI2NTU0NjRjYzVlYzQ1MzM5ZmViNjY1ZjozOGE3YTgwODUwZTBlMDgwMDI5YmVmNTNmZmI1MGQ5Mw==",
'Cache-Control': "no-cache",
}


module.exports = {
	getPaData: (req, res) => {
		console.log(moment())
		console.log("fuck you")
		console.log(req.body.endDate)
		let timeZone = req.body.timeZone
		let startDate = res.send(moment(req.body.startDate).format())
		// let endDate = res.send(moment(req.body.endDate).tz(timeZone).format())
		const querystring = {
			account: 'publisher/10306',
			dimensions: 'date',
			filters: 'dimension:ad_server_api_code==7',
			metrics: 'auctions,auctions_won,paid_impression,revenue',
		  start: "2018-03-14T00:00:00-07:00",
		  // end: now
		}
		const options = { 
			method: 'GET',
	  	url: 'https://api.rubiconproject.com/analytics/v1/report/',
	  	qs: querystring,
			headers: headers
		}
		// request.get(options, (error, response, body) => {
	 //  	if (error) throw new Error(error);
	 //  	res.send(JSON.parse(body))
		// });
	}
}






