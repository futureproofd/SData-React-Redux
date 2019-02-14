import React, { Component } from 'react'; 
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';

export default class GridView extends Component { 
    render(){
        const {entity} = this.props;
        let pageCount = Math.floor(entity.Leads.$totalResults / 100);
        return(
            <ReactTable
                data={entity.Leads.$resources}
                columns={[
                    {
                        Header: "Company",
                        accessor: "Company",                             
                        Cell: row => (
                            <span>
                                <Link key={row.original.$key} to={{pathname:`/leads/${row.original.$key}`}} className="nav-link active">{row.value}</Link>
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