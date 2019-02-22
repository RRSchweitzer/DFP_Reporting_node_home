import React from "react";
import NewNetwork from '../NewNetwork/newNetwork.js';

const networkStyle = {
  "backgroundColor": "hsl(0,0%,100%)",
  "borderColor": "hsl(0,0%,80%)",
  "borderRadius": "4px",
  "borderStyle": "solid",
  "borderWidth": "1px",
  "height": "40px",
  "width": "100%"
};

const headerStyle = {
  "height": "200px",
  "margin":"0",
  "padding":"0"
};

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  };
  componentDidMount = () => {
    let networkList = [];
    fetch('/api/getNetworks')
      .then(res => res.json())
      .then(networks => this.setState({
        networks: networks.rval
    }));
  }
  render() {
      return (
        <header className="row" style={headerStyle}>
          <div id="left-head" className="col-9">
            Rubicon Project
          </div>
          <div id="left-head" className="col-3">
            <NewNetwork
              toggleNetwork={() => this.toggleNetwork()}
              networks={this.state.networks}
              styles={networkStyle}
            />
          </div>
          
        </header>
      );
  }

}

export default Header;

