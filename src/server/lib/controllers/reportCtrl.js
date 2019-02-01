const fs = require('fs');
const uniqid = require('uniqid');
const zlib = require('zlib');
const https = require('https');
const csvjson = require('csvjson');
const util = require('util')
const events = require('events');
var eventEmitter = new events.EventEmitter();

//Create an event handler:
let dfpResultsIn = false
const dfpFinishedEvent = function () {
  dfpResultsIn = true
}
let paResultsIn = false
const paFinishedEvent = function () {
  dfpResultsIn = true
}
parseJson = (dataArr, keyObj) => {
  return new Promise ((resolve, reject) => {
  	var newObj = {}
	  var parsedJson = []
	  for (var i = 0; i < keyObj.length; i++) {
	  	console.log("In the fucking loop");
	  	console.log(typeof (keyObj))
			newObj[keyObj[i].value] = keyObj[i].label
		}
	  for (var i = 1; i < dataArr[0].length; i++) {
	    if (i === 1) {
	      parsedJson.push(dataArr[0][0])    
	    }
	    if (newObj.hasOwnProperty(dataArr[0][i][1].split('=')[0])) {
	      parsedJson.push(dataArr[0][i])
	    }
	  }
		fs.unlink(dataArr[1], err => {
	    if(err) return console.log(err);
	    resolve(parsedJson);
	  })
  })
}

csvToJson = (fileName) => {
  var data = fs.readFileSync(fileName, { encoding : 'utf8'});
  var options = {
    delimiter : ',', // optional
    quote     : '"' // optional
  };
  return [csvjson.toArray(data, options), fileName]
}

module.exports = {
	pullReporting: (req, res) => {
		let startDate = req.body.startDate.split("-");
		let endDate = req.body.endDate.split("-");
		let networkId = req.body.networkId;
		let keysArray = req.body.keysArray;

		dfpUser.getService('ReportService', function (reportService) {
		var uid = uniqid()
		var results = null;
		var args = {
		  reportJob: {
		    reportQuery: {
		      dimensions: ['DATE', 'CUSTOM_CRITERIA'],
		      columns: ['TOTAL_INVENTORY_LEVEL_IMPRESSIONS', 'AD_SERVER_TARGETED_IMPRESSIONS'],
		      startDate: { year: startDate[0], month: startDate[1], day: startDate[2] },
		      endDate: { year: endDate[0], month: endDate[1], day: endDate[2] },
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
		  var reportId = results.rval.id;
		  reportService.getReportJobStatus({reportJobId : reportId}, function (err, data) {
		    if (err) {
		      // return console.log('ERROR', err);
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

		      reportService.getReportDownloadUrlWithOptions(download_args, (err, data) => {		        if (err) {
		          return console.log('ERROR', err.body);
		        }
		        console.log("Downloading report from " + data);
		        download_report(data.rval)
		        .then((dataArr) => {
							// Parse JSON
							console.log("Got JSON Data")
							parseJson(dataArr, keysArray)
							.then(parsedJson => {
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






