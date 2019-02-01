import React from 'react';
import axios from 'axios';

class Report extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      jsonData: null,
    }
  };

  getReporting = (networkId, accountId, timeZone, keysArray, startDate, endDate) => {
    console.log(endDate.endOf("day").format())
    fetch('/api/pullPAReporting', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accountId: 10306,
        timeZone: timeZone,
        startDate: startDate.format(),
        endDate: endDate.format()
      })
    }).then(res => res.json())

  //   let apiRequest1 = fetch('/api/pullPAReporting', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       accountId: accountId,
  //       timeZone: timeZone,
  //       startDate: startDate,
  //       endDate: endDate
  //     })
  //   }).then(res => res.json())

  //   let apiRequest2 = fetch('/api/pullReporting', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       networkId: networkId,
  //       keysArray: keysArray,
  //       startDate: startDate,
  //       endDate: endDate
  //     })
  //   }).then(res => res.json())
  // var combinedData = {"apiRequest1":{},"apiRequest2":{}};
  
  // Promise.all([apiRequest1,apiRequest2]).then(function(values){
  //   console.log("this isn't working because you're stupid")
  //   combinedData["apiRequest1"] = values[0];
  //   combinedData["apiRequest2"] = values[1];
  //   console.log(combinedData)
  //   return combinedData;
  // });
  // ========= OLD SHIT ===================
  //   fetch('/api/pullReporting', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       networkId: networkId,
  //       keysArray: keysArray,
  //       startDate: startDate,
  //       endDate: endDate
  //     })
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       let lineArray = [];
  //       data.forEach((infoArray, index) => {
  //          let line = infoArray.join(",");
  //          lineArray.push(index == 0 ? "data:text/csv;charset=utf-8," + line : line);
  //       });
  //       let csvContent = lineArray.join("\n");
  //       let encodedUri = encodeURI(csvContent);
  //       let link = document.createElement("a");
  //       link.setAttribute("href", encodedUri);
  //       link.setAttribute("download", name + "_" + startDate + "_" + endDate);
  //       document.body.appendChild(link); // Required for FF
  //       link.click();
  //       document.body.removeChild(link);            
  //         // spinner.stop()
  //   });
  }

  onSelect = (value, states) => {
    this.setState({ value, states });
  };

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
    console.log( this.props.endDate)
    return (
      <button onClick={() => this.getReporting(this.props.networkId, 10306, this.props.timeZone, this.props.keysArray, this.props.startDate, this.props.endDate)}> Get Report</button>
    );
  }
}

export default Report;

