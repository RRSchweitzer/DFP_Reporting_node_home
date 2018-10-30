import React from 'react';

const divStyle = {
  width: '100%',
  display: 'inline-block',
  marginTop: '5px'
};

const formatDate = (date) => {
  let dd = date.getDate();
  let mm = date.getMonth()+1; //January is 0!
  let yyyy = date.getFullYear();
  if (dd<10) {
        dd='0'+dd
    } 
    if (mm<10) {
        mm='0'+mm
    }
    let returndate = yyyy+'-'+mm+'-'+dd;
    return returndate;
}

let today = formatDate(new Date());
let prevDays = formatDate(new Date(new Date().setDate(new Date().getDate()-7)));



const Report = props  => {
  return (
    <div style={divStyle}>
      <div className="inputs">Start Date:
       <input id="date-field" value={prevDays} className="form-control strdate" min="1996-02-01" max={today} type="date" name="strtdate" required></input>
      </div>
      <div className="inputs">End Date:
       <input id="date-field" value={today} className="form-control enddate" min="1996-02-01" max={today} type="date" name="enddate" required></input>
      </div>
      <button className="getReport btn btn-secondary">Submit</button>
    </div>
  )
}

export default Report;
