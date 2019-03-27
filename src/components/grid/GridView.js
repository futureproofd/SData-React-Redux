import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class GridView extends Component {
  // eslint-disable-next-line no-unused-vars
  onRowClick = (state, row, column, instance) => ({
    onClick: () => {
      const id = row.original.$key;
      const { entityType, entity, onRowClick } = this.props;
      const singleEntity = entity[entityType].$resources.find(x => x.$key === id);
      onRowClick(entityType, singleEntity);
    },
  });

  render() {
    const { entity, entityType } = this.props;
    const pageCount = Math.floor(entity[entityType].$totalResults / 100);

    return (
      <ReactTable
        data={entity[entityType].$resources}
        columns={[
          {
            Header: 'Company',
            accessor: 'Company',
            Cell: row => (
              <span>
                <Link
                  key={row.original.$key}
                  to={{ pathname: `/${entityType}/${row.original.$key}` }}
                  className="nav-link active"
                >
                  {row.value}
                </Link>
              </span>
            ),
          },
          {
            Header: 'First Name',
            accessor: 'FirstName',
          },
          {
            Header: 'Last Name',
            accessor: 'LastName',
          },
          {
            Header: 'E-Mail',
            accessor: 'Email',
          },
        ]}
        manual
        pages={pageCount}
        loading={false}
        filterable
        defaultPageSize={10}
        className="-striped -highlight"
        getTdProps={this.onRowClick}
      />
    );
  }
}

GridView.propTypes = {
  entityType: PropTypes.string.isRequired,
  onRowClick: PropTypes.func.isRequired,
};
