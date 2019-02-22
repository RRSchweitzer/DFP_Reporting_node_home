import React from "react";

class NewNetwork extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  };

  toggleNetwork = () => {
    let networkInfoArr = document.querySelector('#networks').value.split("-");
    let selectedNetwork = networkInfoArr[0]
    let selectedTimeZone = networkInfoArr[1]
    this.setState({
      selectedNetwork: selectedNetwork,
      selectedTimeZone: selectedTimeZone,
      selectedOption: []
    })
    this.getKeys(selectedNetwork)
  }

  render() {
    let value = ""
    let networks = this.props.networks;
    let optionItems = null
    let networkComponent = null
    if (this.props.networks) {
    	console.log(this.props.networks)
	    optionItems = networks.map((network, index) =>
	      <option onChange={this.props.toggleNetwork} value={network.networkCode + "-" + network.timeZone} key={index}>{network.displayName} </option>
	    );
	  }
	  return (
	     <div style={this.props.styles}>
	      <select id="networks" style={this.props.styles}
	        value={this.props.selectedNetwork}
	        onChange={this.props.toggleNetwork}>
	        <option defaultValue="">Select Network</option>
	        {optionItems}
	      </select>
	    </div>
	  );
  }
}

export default NewNetwork;

