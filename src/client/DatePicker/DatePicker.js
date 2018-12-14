import React from "react";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import Report from '../Report/Report.js';

const moment = extendMoment(originalMoment);

class Example extends React.Component {
  constructor(props, context) {
    super(props, context);
    const today = moment().subtract(1, "days").set({hour:0,minute:0,second:0,millisecond:0});
    this.state = {
      value: moment.range(today.clone().subtract(6, "days"), today.clone()),
    };
  };
	
  onSelect = (value, states) => {
  	console.log(value)
  	console.log(states)
    this.setState({ value, states });
  };

  render() {
    let DateRangeComponent = null
		let ReportButton = null

    if (this.props.isKeySelected) {
      DateRangeComponent = (
      	<div>
      		<DateRangePicker
            value={this.state.value}
            onSelect={this.onSelect}
            singleDateRange={true}
          />
      	

      	</div>
      )
      ReportButton = (
         	<Report
         		networkId={this.props.selectedNetwork}
          	isKeySelected={this.props}
          	keysArray={this.props.keysArray}
          	startDate={this.state.value.start}
          	endDate={this.state.value.end}
        	/> 
      )
    }
    return (
      <div>     
       	{DateRangeComponent}
    
				{ReportButton}
      </div>     

    );
  }
}

export default Example;

