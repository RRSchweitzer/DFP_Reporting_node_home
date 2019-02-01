import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
import Networks from './Networks/Networks.js';
import axios from 'axios';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import DateRangeExample from './DatePicker/DatePicker.js';

const divStyle = {
  width: '300px',
  display: 'inline-block',
  marginTop: '5px',
  zIndex: '2'
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
    selectedTimeZone: "",
    keys: [],
    networkSelected: false,
    multiSelect: true,
    selectedOption: [],
    isKeySelected: false
  }


  getKeys = (networkId) => {
    fetch('/api/getKeys?networkId=' + networkId, {method:'get', headers: {'Access-Control-Allow-Origin': '*'}})
      .then(res => res.json())
      .then(keys => this.setState({
        keys: keys,
        networkSelected: true
      }));
  }

  keysChange = (selectedOption) => {
    let isSelected = {}
    if (selectedOption.length > 0) {
      this.setState({ 
        selectedOption,
        isKeySelected: true
      });
    } else {
      this.setState({ 
        selectedOption,
        isKeySelected: false
      });
    }
    console.log('Option selected:', selectedOption);
  }
  
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
    let realkeyComponent = null

    const { selectedOption } = this.state;
    if (this.state.networkSelected === true) {
      keyComponent = (
        <div style={divStyle}>
          <Select
            isSearchable={true}
            isMulti={true}
            value={selectedOption}
            onChange={this.keysChange}
            options={this.state.keys}
          />
        </div>
      )
    }

    return (
      <div>
        {<Networks  toggleNetwork={() => this.toggleNetwork()}
                    networks={this.state.networks}
                    styles={networkStyle}/>}
        {keyComponent}
        
        <DateRangeExample 
          isKeySelected={this.state.isKeySelected}
          selectedNetwork={this.state.selectedNetwork}
          selectedTimeZone={this.state.selectedTimeZone}
          keysArray={this.state.selectedOption}
          startDate={this.state.value}
          endDate={this.state.value}
        />
      </div>
    );
  }
}

