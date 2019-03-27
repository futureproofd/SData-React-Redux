import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleEntitiesQuery, handleSingleEntity } from '../../actions/getEntity';
import { formatDateLast30 } from '../../utils/date';

import GridView from './GridView';
import Loading from '../Loading';
import getEntityType from '../../utils/entity';

class GridContainer extends Component {
  componentDidMount() {
    this.fetchGridData();
  }

  fetchGridData = () => {
    const { dispatch, session } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    const entity = this.props.match.path.substr(1);
    const where = `CreateDate ge @${formatDateLast30()}@`;
    dispatch(handleEntitiesQuery(session, entity, where));
  };

  onRowClick = (entityType, singleEntity) => {
    const { dispatch, session } = this.props;
    dispatch(handleSingleEntity(session, singleEntity, entityType));
  };

  render() {
    const { entity, isListFetching } = this.props;

    const entityType = getEntityType(this.props);
    return (
      <React.Fragment>
        {isListFetching ? (
          <Loading isListFetching />
        ) : (
          <GridView entity={entity} entityType={entityType} onRowClick={this.onRowClick} />
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { session, token, entity } = state;
  const { isListFetching } = entity || { isListFetching: true };
  return {
    session,
    token,
    entity,
    isListFetching,
  };
}

export default connect(mapStateToProps)(GridContainer);
