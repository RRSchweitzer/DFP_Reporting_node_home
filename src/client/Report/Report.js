import React from 'react';

class Report extends React.Component {
  constructor(props, context) {
    super(props, context);
    const today = moment().subtract(1, "days").set({hour:0,minute:0,second:0,millisecond:0});
    this.state = {
      value: moment.range(today.clone().subtract(6, "days"), today.clone())
    };
  };

  getReporting = (networkId, keysArray) => {
    fetch('/api/getKeys?networkId=' + networkId, + "&keysArray=" + keysArray, {method:'get', headers: {'Access-Control-Allow-Origin': '*'}})
      .then(res => res.json())
      .then(jsonData => this.setState({
        jsonData: jsonData,
      }));
  }
  
  onSelect = (value, states) => {
    this.setState({ value, states });
  };

  renderSelectionValue = () => {
    return (
      <div>
        <div>Selection</div>
        {this.state.value.start.format("YYYY-MM-DD")}
        {" - "}
        {this.state.value.end.format("YYYY-MM-DD")}
      </div>
    );
  };

  render() {
    let DateRangeComponent = null

    if (this.props.isKeySelected) {
      DateRangeComponent = (
          <DateRangePicker
            value={this.state.value}
            onSelect={this.onSelect}
            singleDateRange={true}
          />
      )
    }
    return (
      <div>     
        {DateRangeComponent}     
      </div>
    );
  }
}

export default Report;

