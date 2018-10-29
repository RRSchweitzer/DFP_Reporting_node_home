import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
import Networks from './Networks/Networks.js';
import axios from 'axios';
import Select from 'react-select';

const divStyle = {
  width: '300px',
  display: 'inline-block',
  marginTop: '5px'
// textAlign: 'center'
};
  const customStyles = {
    // option: (base, state) => ({
    //   ...base,
    //   borderBottom: '1px dotted pink',
    //   color: state.isFullscreen ? 'red' : 'blue',
    //   padding: 20,
    //   width: 800
    // }),

  }

export default class App extends Component {
  state = { 
    networks: [],
    selectedNetwork: "",
    keys: [],
    keysGot: false,
    multiSelect: true,
    selectedOption: null,
  }


  getKeys = (networkId) => {
    fetch('/api/getKeys?networkId=' + networkId, {method:'get', headers: {'Access-Control-Allow-Origin': '*'}})
      .then(res => res.json())
      .then(keys => this.setState({
        keys: keys,
        keysGot: true
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
    let keysfield = null
    const { selectedOption } = this.state;
    if (this.state.keysGot === true) {
      keysfield = (
        <div style={divStyle}>
          <Select
            styles={customStyles}
            isSearchable={true}
            isMulti={true}
            value={selectedOption}
            onChange={this.handleChange}
            options={this.state.keys}
          />
        </div>
      )
    }
    return (
      <div>
        {<Networks  toggleNetwork={() => this.toggleNetwork()}
                    networks={this.state.networks}/>}
        {keysfield}
        <img src={ReactImage} alt="react" />
      </div>
    );
  }
}

