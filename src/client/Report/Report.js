import React from 'react';
import Select from 'react-select';

const divStyle = {
  width: '300px',
  display: 'inline-block',
  marginTop: '5px'
// textAlign: 'center'
};
const handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log('Option selected:', selectedOption);
}

const getKeys = networkId => {
  fetch('/api/getKeys?networkId=' + networkId, {method:'get', headers: {'Access-Control-Allow-Origin': '*'}})
    .then(res => res.json())
    .then(keys => this.setState({
      keys: keys,
      keysGot: true
    }));
}
  let keysOrButton = null;

// const { selectedOption } = this.state.selectedOption;

const Keys = props  => {
    if (props.state.keysGot === true) {
       keysOrButton = ( 
          <Select
            isSearchable={true}
            isMulti={true}
            value={props.state.selectedOption}
            onChange={handleChange}
            options={props.state.keys}
          />
      )
    }
    return (
      <div style={divStyle}>
        {keysOrButton}
      </div>
    )
}

export default Keys;
