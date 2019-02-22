import React from 'react';
import axios from 'axios';
import DataTable from '../DataTable/DataTable.js';

class Report extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      jsonData: null,
    }
  };
  mergePaDfpData = (paData, DFPData) => {
    console.log(paData)
    let holder = {};
    for (let i = 0; i < DFPData.length; i++) {
      if (!holder.hasOwnProperty(DFPData[i].dates)) {
        holder[DFPData[i].dates] = {
          "date": DFPData[i].dates,
          "imps": parseInt(DFPData[i].imps),
          "targImps": parseInt(DFPData[i].targImps)
        }
      } else {
        holder[DFPData[i].dates].imps += parseInt(DFPData[i].imps)
        holder[DFPData[i].dates].targImps += parseInt(DFPData[i].targImps)
      }      
    }
    const keys = Object.keys(holder);

    let finishedShit = [];
    for (let i = 0, len = keys.length; i < len; i++) {
      if(paData[i].date === holder[keys[i]].date) {
        finishedShit[i] = {
          "date": holder[keys[i]].date,
          "paDate": paData[i].date,
          "TI/AW": (holder[keys[i]].imps / paData[i].auctions_won * 100).toFixed(2),
          "PI/TTI": (paData[i].paid_impression / holder[keys[i]].targImps * 100).toFixed(2),
          "PI/AW": (paData[i].paid_impression / paData[i].auctions_won * 100).toFixed(2),
          "AW/A": (paData[i].auctions_won /paData[i].auctions * 100).toFixed(2),
        }
      }
    }
    return finishedShit
  }

  getReporting = (networkId, accountId, timeZone, keysArray, startDate, endDate) => {
    const apiRequest1 = fetch('/api/pullPAReporting', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accountId: accountId,
        timeZone: timeZone,
        startDate: startDate,
        endDate: endDate
      })
    }).then(res => res.json())

    const apiRequest2 = fetch('/api/pullReporting', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        networkId: networkId,
        keysArray: keysArray,
        startDate: startDate,
        endDate: endDate
      })
    }).then(res => res.json())
    const combinedData = {"paData":{},"DFPData":{}};
    Promise.all([apiRequest1,apiRequest2]).then(values => {
      combinedData["paData"] = values[0];
      combinedData["DFPData"] = values[1];
      let mergedData = this.mergePaDfpData(combinedData["paData"], combinedData["DFPData"])
      this.props.setEvent("dfpData", combinedData["DFPData"])
      this.props.setEvent("paData", combinedData["paData"])
      this.props.setEvent("other", mergedData)
    });
  }


  renderSelectionValue = () => {
    return (
      <div>
        <div>Selection</div>
        {this.state.value.start}
        {" - "}
        {this.state.value.end}
      </div>
    );
  };

  render() {
    let DateRangeComponent = null
    let reportButton = null
    return (
      <div>
        <button onClick={() => this.getReporting(this.props.networkId, 10306, this.props.timeZone, this.props.keysArray, this.props.startDate, this.props.endDate)}> Get Report</button>
      </div>
    );
  }
}

export default Report;

