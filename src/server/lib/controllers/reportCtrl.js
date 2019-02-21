const fs = require('fs');
const uniqid = require('uniqid');
const zlib = require('zlib');
const https = require('https');
const csvjson = require('csvjson');
const util = require('util')
const events = require('events');
const moment = require('moment-timezone')

parseJson = (dataArr, keyObj) => {
	return new Promise ((resolve, reject) => {
		const filterKeys = {};
		const parsedJson = [];
		let column = []
		for (var i = 0; i < keyObj.length; i++) {
			filterKeys[keyObj[i].value] = keyObj[i].label
		}
		for (var i = 1; i < dataArr[0].length; i++) {
			if (filterKeys.hasOwnProperty(dataArr[0][i][1].split('=')[0])) {
				column[i] = {
					"dates": dataArr[0][i][0],
					"kvs": dataArr[0][i][1],
					"imps": dataArr[0][i][3],
					"targImps": dataArr[0][i][4]
				}
			// console.log(column)
				parsedJson.push(column[i])
			}
		}
		fs.unlink(dataArr[1], err => {
			if(err) return console.log(err);
			resolve(parsedJson);
		})
	})
}

csvToJson = (fileName) => {
	var data = fs.readFileSync(fileName, { encoding : 'utf8' });
	var options = {
		delimiter : ',', // optional
		quote     : '"' // optional
	};
	return [csvjson.toArray(data, options), fileName]
}

module.exports = {
	pullReporting: (req, res) => {
		let keysArray = req.body.keysArray
		let networkId = req.body.networkId
		const Dfp = require('node-google-dfp');
		const {JWT} = require('google-auth-library');
		const config = require('../../../../config.json');
		let startDate = moment(req.body.startDate).format("L").split("/");
		let endDate = moment(req.body.endDate).format("L").split("/");
		const jwtClient = new JWT(config.serviceAccountEmail, config.prebidKey , null, ['https://www.googleapis.com/auth/dfp']);
		const dfpUser = new Dfp.User(networkId, config.appName, config.version);
		dfpUser.setClient(jwtClient)

		dfpUser.getService('ReportService', function (reportService) {
			var uid = uniqid()
			var results = null;
			var args = {
			  reportJob: {
			    reportQuery: {
			      dimensions: ['DATE', 'CUSTOM_CRITERIA'],
			      columns: ['TOTAL_INVENTORY_LEVEL_IMPRESSIONS', 'AD_SERVER_TARGETED_IMPRESSIONS'],
			      startDate: { year: Number(startDate[2]), month: Number(startDate[0]), day: Number(startDate[1]) },
			      endDate: { year: Number(endDate[2]), month: Number(endDate[0]), day: Number(endDate[1]) },
			    }
			  }
			};
			getFile = download_url => {
			  return new Promise ((resolve, reject) => {
			    https.get(download_url, response => {
			      console.log({"getFile": "hi"})
			      resolve(response);
			    })
			  })
			}

			writeFile = (response, file) => {
			  return new Promise ((resolve, reject) => {
			    response.pipe(zlib.createGunzip()).pipe(file).on("finish", () => {
			      console.log("write file")
			      resolve()
			    })
			  });
			}

			download_report = download_url => {
			  return new Promise ((resolve, reject) => {
			    var fileName = 'downloaded_report_' + uid + '.csv'
			    var file = fs.createWriteStream(fileName);
			    getFile(download_url)
			    .then(response => {
			      writeFile(response, file)
			    .then(() => {
			      var data = csvToJson(fileName)[0]
			      resolve([data, fileName])
			    })
			    })
			  })
			}

			check_report_ready = ()  => {
			  let reportId = results.rval.id;
			  reportService.getReportJobStatus({reportJobId : reportId}, function (err, data) {
			    if (err) {
			      return console.log('ERROR', err);
			    }
			    console.log('Report Job #' + reportId + ' returned ' + data.rval);
			    if (data.rval === 'COMPLETED') {

			      var download_args = {
			        reportJobId: reportId,
			        reportDownloadOptions : {
			          exportFormat            : 'CSV_DUMP',
			          includeReportProperties : false,
			          includeTotalsRow        : false,
			          useGzipCompression      : true
			        }
			      };

			      reportService.getReportDownloadUrlWithOptions(download_args, (err, data) => {
			      	if (err) {
		          	return console.log('ERROR', err.body);
							}
			        console.log("Downloading report from " + data);
							download_report(data.rval)
							.then((dataArr) => {
								// Parse JSON
								console.log("Got JSON Data")
								parseJson(dataArr, keysArray)
								.then(parsedJson => {
									console.log(typeof(parsedJson))
									console.log(Array.isArray(parsedJson))
									console.log(parsedJson)
									console.log("============================")
									res.status(200).json(parsedJson);
								})
							})
						});
					}

			    if (data.rval === 'FAILED') {
			      console.log('Report Failed!');
			    }

			    if (data.rval === 'IN_PROGRESS') {
			      setTimeout(check_report_ready, 100);
			    }

			  });
			}

			reportService.runReportJob(args, (err, jobStatus) => {
				if (err) {
					return console.log('ERROR', err.body);
				}
				results = jobStatus;
				setTimeout(check_report_ready, 100);
			});
		})
	}
}






