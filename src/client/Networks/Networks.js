import React from 'react';


const Networks = ( props ) => {
    let value = ""
    let networks = props.networks;
    let optionItems
    optionItems = networks.map((network, index) =>
      <option onChange={props.toggleNetwork} value={network.networkCode} key={index}>{network.displayName} </option>
    );
    return (
     <div>
      <select id="funtime" style={props.styles}
        value={props.selectedNetwork}
        onChange={props.toggleNetwork}>
        <option defaultValue="">Select Network</option>
        {optionItems}
      </select>
     </div>
    )
}

export default Networks;
