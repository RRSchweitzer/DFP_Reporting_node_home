import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
import Networks from './Networks/Networks.js';
import axios from 'axios';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from './DatePicker/DatePicker.js';
import BootstrapTable from 'react-bootstrap-table-next';

const paColumns = [
{
  dataField: 'date',
  text: 'Date',
  sort: true,
  headerStyle: (colum, colIndex) => {
    return { width: '40px', textAlign: 'center'};
  }
}, {
  dataField: 'revenue',
  text: 'Revenue',
  sort: true,
  headerStyle: (colum, colIndex) => {
    return { width: '50px', textAlign: 'center'};
  }
}, {
  dataField: 'auctions_won',
  text: 'Auctions Won',
  classes: 'id-custom-cell',
  sort: true,
  headerStyle: (colum, colIndex) => {
    return { width: '20px', textAlign: 'center' };
  }
},{
  dataField: 'paid_impression',
  text: 'Paid Impressions',
  sort: true,
  headerStyle: (colum, colIndex) => {
    return { width: '40px', textAlign: 'center' };
  }
},{
  dataField: 'auctions',
  text: 'Auctions',
  sort: true,
  headerStyle: (colum, colIndex) => {
    return { width: '40px', textAlign: 'center' };
  }
}]



const dfpColumns = [
{
  dataField: 'dates',
  text: 'Date',
  sort: true,
  sortFunc: (a, b, order, dataField, rowA, rowB) => {
    if (order === 'asc') {
      return b - a;
    }
    return a - b; // desc
  },
  components: {
    sortElement: true,
    filterElement: true
  },
  sortFunc: (a, b, order, dataField, rowA, rowB) => {
    if (order === 'asc') {
      return b - a;
    }
    return a - b; // desc
  },
  sortCaret: (order, column) => {
    if (order === "asc") {
      return (<span className="container">&#9650;</span>)
    } else if (order === "desc") {
      return (<span className="container">&#9660;</span>)
    } else {
      return (<span className="container">&#9650;</span>)
    }
  },
  headerStyle: (colum, colIndex) => {
    return { width: '40px', textAlign: 'center'};
  }
}, {
  dataField: 'kvs',
  text: 'KV Pair',
  sort: true,
  sortCaret: (order, column) => {
    if (order === "asc") {
      return (<span className="container">&#9650;</span>)
    } else if (order === "desc") {
      return (<span className="container">&#9660;</span>)
    } else {
      return (<span className="container">&#9650;</span>)
    }
  },
  sortFunc: (a, b, order, dataField, rowA, rowB) => {
    if (order === 'asc') {
      return b - a;
    }
    return a - b; // desc
  },
  headerStyle: (colum, colIndex) => {
    return { width: '50px', textAlign: 'center'};
  }
}, {
  dataField: 'imps',
  text: 'Impressions',
  sort: true,
  sortCaret: (order, column) => {
    if (order === "asc") {
      return (<span className="container">&#9650;</span>)
    } else if (order === "desc") {
      return (<span className="container">&#9660;</span>)
    } else {
      return (<span className="container">&#9650;</span>)
    }
  },
  sortFunc: (a, b, order, dataField, rowA, rowB) => {
    if (order === 'asc') {
      return b - a;
    }
    return a - b; // desc
  },
  headerStyle: (colum, colIndex) => {
    return { width: '20px', textAlign: 'center' };
  }
},{
  dataField: 'targImps',
  text: 'Total Targeted Impressions',
  sort: true,
  sortCaret: (order, column) => {
    if (order === "asc") {
      return (<span className="container">&#9650;</span>)
    } else if (order === "desc") {
      return (<span className="container">&#9660;</span>)
    } else {
      return (<span className="container">&#9650;</span>)
    }
  },
  sortFunc: (a, b, order, dataField, rowA, rowB) => {
    if (order === 'asc') {
      return b - a;
    }
    return a - b; // desc
  },
  onSort: (field, order) => {
    console.log(field)
    console.log(order)
  },
  headerStyle: (colum, colIndex) => {
    return { width: '40px', textAlign: 'center' };
  }
}];


const mergeColumns = [
{
  dataField: 'date',
  text: 'DFPDate',
  sort: true,
  headerStyle: (colum, colIndex) => {
    return { width: '40px', textAlign: 'center'};
  }
},
{
  dataField: 'paDate',
  text: 'PaDate',
  sort: true,
  headerStyle: (colum, colIndex) => {
    return { width: '40px', textAlign: 'center'};
  }
},{
  dataField: 'TI/AW',
  text: 'TI/AW',
  sort: true,
  headerStyle: (colum, colIndex) => {
    return { width: '50px', textAlign: 'center'};
  }
}, {
  dataField: 'PI/TTI',
  text: 'PI/TTI',
  sort: true,
  headerStyle: (colum, colIndex) => {
    return { width: '20px', textAlign: 'center' };
  }
},{
  dataField: 'PI/AW',
  text: 'PI/AW',
  sort: true,
  headerStyle: (colum, colIndex) => {
    return { width: '20px', textAlign: 'center' };
  }
},{
  dataField: 'AW/A',
  text: 'AW/A',
  sort: true,
  headerStyle: (colum, colIndex) => {
    return { width: '40px', textAlign: 'center' };
  }
}];


const divStyle = {
  width: '100%',
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
  "width": "100%"
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      networks: [],
      selectedNetwork: "",
      selectedTimeZone: "",
      keys: [],
      networkSelected: false,
      multiSelect: true,
      selectedOption: [],
      isKeySelected: false,
      dfpData: [],
      paData: [],
      other: []
    }
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
    let isSelected = {};
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

  inputChangeHandler = (event, data) => {
    console.log(event)
    console.log(data)
      var stateObject = function() {
        var returnObj = {};
        returnObj[event] = data;
           return returnObj;
      }.bind(event)();
      this.setState( stateObject );    
  }

  componentDidMount = () => {
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
    let dfpData = []
    let paData = []
    let other = []
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
    if (this.state.dfpData.length < 0) {
      dfpData = []
    } else {
      dfpData = this.state.dfpData
    }
    if (this.state.paData.length < 0) {
      paData = []
    } else {
      paData = this.state.paData
    }
    if (this.state.other.length < 0) {
      other = []
    } else {
      other = this.state.other
    }
    return (
      <div className="container">
        <div className="row">
        <div className="col-3">
          <div>
            {<Networks toggleNetwork={() => this.toggleNetwork()}
                       networks={this.state.networks}
                      styles={networkStyle}/>}
          </div>
            {keyComponent}
        <DatePicker
          isKeySelected={this.state.isKeySelected}
          selectedNetwork={this.state.selectedNetwork}
          selectedTimeZone={this.state.selectedTimeZone}
          keysArray={this.state.selectedOption}
          startDate={this.state.value}
          endDate={this.state.value}
          inputChangeHandler={this.inputChangeHandler}
        />
      </div>
      <div className="col-9">
        <BootstrapTable classes="react-bootstrap-table" keyField='id' width={'20%'} data={ other } columns={ mergeColumns } />
        <BootstrapTable classes="react-bootstrap-table" keyField='id' width={'20%'} data={ paData } columns={ paColumns } />
        <BootstrapTable classes="react-bootstrap-table" keyField='id' width={'20%'} data={ dfpData } columns={ dfpColumns } />
      </div>
      </div>
    </div>

    );
  }
}

