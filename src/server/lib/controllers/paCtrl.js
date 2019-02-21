const url = "https://api.rubiconproject.com/analytics/v1/report/"
const config = require('../../../../config.json');
const request = require('request')
const moment = require('moment-timezone')

const headers = {
	'Content-Type': "application/json",
	'Authorization': "Basic YjcyMTk1ZjBiNDM0YWFjNmI2NTU0NjRjYzVlYzQ1MzM5ZmViNjY1ZjozOGE3YTgwODUwZTBlMDgwMDI5YmVmNTNmZmI1MGQ5Mw==",
	'Cache-Control': "no-cache",
}

let body = {}
module.exports = {
	getPaData: (req, res) => {
		let timeZone = req.body.timeZone
		let endDate = moment.tz(req.body.endDate.split("T")[0], "America/Los_Angeles").endOf('day')
		let startDate = moment.tz(req.body.startDate.split("T")[0], "America/Los_Angeles").format()
		let now = moment.tz("America/Los_Angeles")
		let isEndToday = endDate.isSame(now, 'day')

		if (isEndToday === true || endDate > now) {
			endDate = now.format()
		} else {
			endDate = endDate.format()
		}

		const querystring = {
			account: 'publisher/10306',
			dimensions: 'date',
			filters: 'dimension:ad_server_api_code==7',
			metrics: 'auctions,auctions_won,paid_impression,revenue',
			start: startDate,
			end: endDate
		}
		const options = {
			method: 'GET',
			url: 'https://api.rubiconproject.com/analytics/v1/report/',
			qs: querystring,
			headers: headers
		}
		request.get(options, (error, response, body) => {
			if (error) throw new Error(error);
			body = JSON.parse(body)
			newArray = []
			let data = body.data.items
			res.send(data)
		});
	}
}