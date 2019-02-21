import React from "react";

const $ = require('jquery');
$.DataTable = require('datatables.net');

const columns = [
    {
        title: 'Name',
        width: 120,
        data: 'name'
    },
    {
        title: 'Nickname',
        width: 180,
        data: 'nickname'
    },
];

class Table extends React.Component {
  componentDidMount() {
      $(this.refs.main).DataTable({
         dom: '<"data-table-wrapper"t>',
         data: this.props.names,
         columns,
         ordering: false
      });
  }
  componentWillUnmount(){
     $('.data-table-wrapper')
     .find('table')
     .DataTable()
     .destroy(true);
  }
  shouldComponentUpdate() {
      return false;
  }
  updateTable(names) {
  const table = $('.data-table-wrapper')
                .find('table')
                .DataTable();
  let dataChanged = false;
  table.rows().every(function () {
      const oldNameData = this.data();
      const newNameData = names.find((nameData) => {
          return nameData.name === oldNameData.name;
      });
      if (oldNameData.nickname !== newNameData.nickname) {
          dataChanged = true;
          this.data(newNameData);
      }
      return true; // RCA esLint configuration wants us to 
                   // return something
  });

  if (dataChanged) {
      table.draw();
  }
}
  reloadTableData(names) {
    const table = $('.data-table-wrapper')
                  .find('table')
                  .DataTable();
    table.clear();
    table.rows.add(names);
    table.draw();
}
  render() {
      return (
          <div>
              <table ref="main" />
          </div>);
  }
}

export default Table;
