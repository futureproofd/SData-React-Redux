import React, { Component } from 'react'; 
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class GridView extends Component { 

    onRowClick = (state, row, column, instance) => {
        return {
            onClick: e => {
                let id = row.original.$key;
                let entityType = this.props.entityType;
                let singleEntity = this.props.entity[entityType].$resources.find(x => x.$key === id);
                this.props.onRowClick(entityType, singleEntity);
            }
        }
    }

    render(){
        const {entity, entityType} = this.props;
        let pageCount = Math.floor(entity[entityType].$totalResults / 100);

        return(
            <ReactTable
                data={entity[entityType].$resources}
                columns={[
                    {
                        Header: "Company",
                        accessor: "Company",                             
                        Cell: row => (
                            <span>
                                <Link key={row.original.$key} 
                                    to={{pathname:`/${entityType}/${row.original.$key}`}} 
                                    className="nav-link active">{row.value}
                                </Link>
                            </span>
                        )
                    },
                    {
                        Header: "First Name",
                        accessor: "FirstName"
                    },
                    {
                        Header: "Last Name",
                        accessor: "LastName"
                    },
                    {
                        Header: "E-Mail",
                        accessor: "Email"
                    }
                ]}
                manual
                pages={pageCount}
                loading={false}
                filterable
                defaultPageSize={10}
                className="-striped -highlight"
                getTdProps={this.onRowClick}
            />
        )
    }
}

GridView.propTypes = {
    entity : PropTypes.object.isRequired,
    entityType : PropTypes.string.isRequired,
    onRowClick : PropTypes.func.isRequired
};