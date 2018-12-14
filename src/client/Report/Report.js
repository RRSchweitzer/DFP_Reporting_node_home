import React from 'react';
import axios from 'axios';

class Report extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      jsonData: null,
    }
  }

  getReporting = (networkId, keysArray, startDate, endDate) => {
    fetch('/api/getReporting', {
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
    })
      .then(res => res.json())
      .then(data => {
        var lineArray = [];
        data.forEach(function (infoArray, index) {
           var line = infoArray.join(",");
           lineArray.push(index == 0 ? "data:text/csv;charset=utf-8," + line : line);
        });
        var csvContent = lineArray.join("\n");
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", name + "_" + startDate + "_" + endDate);
        document.body.appendChild(link); // Required for FF
        link.click();
        document.body.removeChild(link);            
          // spinner.stop()
    });
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
    console.log(typeof this.props.keysArray)
    return (
      <button onClick={() => this.getReporting(this.props.networkId, this.props.keysArray, this.props.startDate.format("YYYY-MM-DD"), this.props.endDate.format("YYYY-MM-DD"))}> Get Report</button>
    );
  }
}

export default Report;

