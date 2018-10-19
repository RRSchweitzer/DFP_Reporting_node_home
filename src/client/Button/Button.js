import React from 'react';
// use lowerCase letter for function and should match the component name

const buttonStyle = {
  margin: '10px 10px 10px 0'
};

const button = ( props ) => {

	return (
		<button
      className="btn btn-default"
      style={buttonStyle}
      onClick={props.clickAction}
      >{props.name}

    </button>
	)
}
export default button