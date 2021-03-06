import React from 'react';
const divStyle = {
  width: '100%',
};

const Networks = ( props ) => {
    let value = ""
    let networks = props.networks;
    let optionItems
    optionItems = networks.map((network, index) =>
      <option onChange={props.toggleNetwork} value={network.networkCode + "-" + network.timeZone} key={index}>{network.displayName} </option>
    );
    return (
      <div style={divStyle}>
        <select id="networks" style={props.styles}
          value={props.selectedNetwork}
          onChange={props.toggleNetwork}>
          <option defaultValue="">Select Network</option>
          {optionItems}
        </select>
      </div>
    )
}

export default Networks;
