import React, { Component } from 'react'; 
import ReactTable from 'react-table';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import "react-table/react-table.css";

import DetailContainer from '../detail/DetailContainer';

export default class GridView extends Component { 

    onRowClick = (state, rowInfo, column, instance) => {
        return {
            onClick: e => {
                console.log('A Td Element was clicked!')
                console.log('it produced this event:', e)
                console.log('It was in this column:', column)
                console.log('It was in this row:', rowInfo)
                console.log('It was in this table instance:', instance)
            }
        }
    }
    handleButtonClick(e, row){
        console.log('clicked', e,row);
    }

    render(){
        const {entity} = this.props;
        const pageCount = Math.floor(entity.Leads.$totalResults / 100);
        return(
            <Router>
            <div>
                <ReactTable
                    data={entity.Leads.$resources}
                    columns={[
                        {
                            Header: "Company",
                            accessor: "Company",                             
                            Cell: row => (
                                <span>
                                    <Link to={{pathname:`/Lead/${row.original.$key}`}} className="nav-link active">{row.value}</Link>
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
                <Route
                    path='/Lead/:id'
                    component={DetailContainer}
                />
            </div>
            </Router>
        )
    }
}