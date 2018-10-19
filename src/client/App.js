import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
// import Networks from './Networks/Networks.js';
import Networks from './Networks/Networks.js';
import Button from './Button/Button.js';
import axios from 'axios'

const config = {
  headers: {'Access-Control-Allow-Origin': '*'},
  port: 8080
};

export default class App extends Component {
  state = { 
    networks: [],
    selectedNetwork: "",
    keys: []
  };


  getKeys = () => {
    fetch('/api/getKey', config)
      // .then(res => res.json())
      .then(keys => this.setState({
        keys: keys
    }));
  }
  toggleNetwork = (event) => {
    value = event.target.value
    console.log(value)
  }
  componentDidMount() {
    let networkList = [];
    fetch('/api/getNetworks', config)
      .then(res => res.json())
      .then(networks => this.setState({
        networks: networks.rval
      }));
  }

  render() {
    return (
      <div>
        <Networks toggleNetwork={(event) => this.nameChangedHandler(event)}/>
        <Button state={this.state}
                value={this.state.selectedNetwork}
                clickAction={(networkCode) => this.getKeys(networkCode)}
                name="Get Keys"/>
        <img src={ReactImage} alt="react" />
      </div>
    );
  }
}

