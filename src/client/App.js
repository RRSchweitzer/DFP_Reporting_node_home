import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
import Networks from './Networks/Networks.js';
import Report from './Report/Report.js';
import axios from 'axios';
import Select from 'react-select';

const divStyle = {
  width: '300px',
  display: 'inline-block',
  marginTop: '5px'
};

const networkStyle = {
  "backgroundColor": "hsl(0,0%,100%)",
  "borderColor": "hsl(0,0%,80%)",
  "borderRadius": "4px",
  "borderStyle": "solid",
  "borderWidth": "1px",
  "height": "40px",
  "width": "300px"
};

export default class App extends Component {
  state = { 
    networks: [],
    selectedNetwork: "",
    keys: [],
    networkSelected: false,
    multiSelect: true,
    selectedOption: [],
  }


  getKeys = (networkId) => {
    fetch('/api/getKeys?networkId=' + networkId, {method:'get', headers: {'Access-Control-Allow-Origin': '*'}})
      .then(res => res.json())
      .then(keys => this.setState({
        keys: keys,
        networkSelected: true
      }));
  }

  styleFn = (base, state) => {
    // optionally spread base styles
    return { ...base, color: state.isFocused ? 'blue' : 'red' };
  }


  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log('Option selected:', selectedOption);
  }
  
  toggleNetwork = () => {
    let selectedNetwork = document.querySelector('#funtime').value
    this.setState({
      selectedNetwork: selectedNetwork,
      selectedOption: null
    })
    this.getKeys(selectedNetwork)

  }
  componentDidMount() {
    let networkList = [];
    fetch('/api/getNetworks')
      .then(res => res.json())
      .then(networks => this.setState({
        networks: networks.rval
    }));
  }

  render() {
    let keyComponent = null
    let reportComponent = null
    const { selectedOption } = this.state;
    if (this.state.networkSelected === true) {
      keyComponent = (
        <div style={divStyle}>
          <Select
            isSearchable={true}
            isMulti={true}
            value={selectedOption}
            onChange={this.handleChange}
            options={this.state.keys}
          />
        </div>
      )
    }
    if (this.state.selectedOption !== null && this.state.selectedOption.length > 0) {
      reportComponent = (
        <Report
          styles={divStyle}
        />
      )
    }
    return (
      <div>
        {<Networks  toggleNetwork={() => this.toggleNetwork()}
                    networks={this.state.networks}
                    styles={networkStyle}/>}
        {keyComponent}
        {reportComponent}
      </div>
    );
  }
}

