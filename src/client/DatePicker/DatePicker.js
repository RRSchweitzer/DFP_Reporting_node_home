import React from "react";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import Report from '../Report/Report.js';

const moment = extendMoment(originalMoment);

class DatePicker extends React.Component {
  constructor(props, context) {
    super(props, context);
    const today = moment().subtract(1, "days").set({hour:0,minute:0,second:0,millisecond:0});
    console.log(today)
    this.state = {
      value: moment.range(today.clone().subtract(6, "days"), today.clone()),
      jsonData: []
    };
  };

  onSelect = (value, states) => {
    console.log(value)
    this.setState({ value, states });
  };

  setDfpState = (dfpData, data) => {
    this.props.dfpHandler({ dfpData });
  };

  setPaState = (paData, data) => {
    this.props.paHandler( {paData} );
  };

  setOtherState = (other, data) => {
    this.props.otherHandler({ other });
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
      <div>
        <Report
          networkId={this.props.selectedNetwork}
          timeZone={this.props.selectedTimeZone}
          isKeySelected={this.props}
          keysArray={this.props.keysArray}
          startDate={this.state.value.start}
          endDate={this.state.value.end}
          setPaState={this.setPaState}
          setDfpState={this.setDfpState}
          setOtherState={this.setOtherState}
      	/>
      </div>
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

export default DatePicker;

