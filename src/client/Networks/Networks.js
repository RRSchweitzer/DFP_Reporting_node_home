import React from 'react';


function updateState(text){
    this.setState({text})
}

// class Networks extends React.Component {
const Networks = ( props ) => {

  // constructor(props) {
  //   super(props);
  //   this.state = {props}
  //   updateState = updateState.bind(this)
  // }


  toggleNetwork = (event) => {
  	value = event.target.value
  	console.log(value)
  }
  // render = () => {
  	let value = ""
    let networks = this.props.state.networks;
    let optionItems
  	optionItems = networks.map((network, index) =>
			<option value={network.networkCode} key={index}>{network.displayName} </option>
    );
    return (
     <div>
			<select id="funtime" 
							value={this.setState.selectedNetwork}
							onChange={(event) => this.setState({
								...this.state,
								selectedNetwork: event.target.value
							})}>
							{console.log(this.state)}
			  	<option value="" disabled selected onChange={this.toggleNetwork}>Select Network</option>
					{optionItems}
			</select>
     </div>
    )
  // }
}

export default Networks;
