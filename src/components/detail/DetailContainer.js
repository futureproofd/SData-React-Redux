import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import SingleInput from './SingleInput';
import Textbox from './Textbox';
import Loading from '../Loading';
import PickList from './PickList';
import { handleEntityUpdate } from '../../actions/putEntity';
import { handleSingleEntity } from '../../actions/getEntity';
import { validateEmail } from '../../utils/validate';
import { resourceQueryTypes } from '../../config/config';

class DetailContainer extends Component {
  constructor(props) {
    super(props);

    const { entity, isDetailFetching } = this.props;

    if (isDetailFetching) {
      this.state = {
        Key: '',
        detailRecord: '',
        Email: {},
        Notes: {},
        Status: {},
        draftField: '',
        editing: false,
        pendingChanges: [],
      };
    } else {
      const entityDetail = entity[`${entity.entityType} Detail`];
      // store in local state, any changes to entity record here
      this.state = {
        Key: entityDetail.$key,
        detailRecord: `${entity.entityType} Detail`,
        Email: { value: entityDetail.Email, isDirty: false },
        Notes: { value: entityDetail.Notes, isDirty: false },
        Status: { value: entityDetail.Status, isDirty: false },
        draftField: null,
        editing: false,
        pendingChanges: [],
      };
    }
  }

  /**
   * From direct URL navigation (POP) to a detail entity
   */
  componentDidMount() {
    const {
      entity, history, dispatch, session, match,
    } = this.props;

    this.getLocalResources(session);

    if (entity === null && history.action === 'POP') {
      const { entityType, id } = match.params;
      dispatch(handleSingleEntity(session, id, entityType));
    }
  }

  /**
   * On Entity prop changes, update local state form-fields
   * @param {*} props current props
   * @param {*} state current state
   */
  static getDerivedStateFromProps(props, state) {
    if (props.isDetailFetching) {
      return null;
    }

    if (props.entity[`${props.entity.entityType} Detail`]) {
      const detailRecord = `${props.entity.entityType} Detail`;
      if (props.entity[detailRecord].$key !== state.$key) {
        if (state.editing) {
          // Field is editing
          return {
            [state.draftField]: {
              value: state[state.draftField].value,
              isDirty: true,
            },
            detailRecord,
            editing: false,
          };
        }
        return {
          Key: props.entity[detailRecord].$key,
          Email: { value: props.entity[detailRecord].Email },
          Notes: { value: props.entity[detailRecord].Notes },
          Status: { value: props.entity[detailRecord].Status },
          pendingChanges: [],
        };
      }
    }
    return null;
  }

  /**
   * Initialize all locally needed resources (picklists)
   * @param session sData authenticated session for API calls
   */
  getLocalResources = (session) => {
    this.handleSingleResource(session, resourceQueryTypes.picklist, 'Lead Status Web');
  };

  /**
   * gets and sets a single resource object on state from sData API call
   * @param session sData authenticated session for API access
   * @param {string} resource exact resource type for API call param (i.e. 'picklists')
   * @param {string} identifier exact name of the resource for API call param
   */
  handleSingleResource = (session, resource, identifier) => {
    session.sData
      .get(resource, identifier)
      .then((res) => {
        if (res) {
          const vals = { [identifier]: [] };
          [res.$resources].forEach((arr) => {
            arr.forEach((obj) => {
              vals[identifier].push(obj.text);
            });
          });

          this.setState({
            [resource]: vals,
          });
        } else {
          console.log('error');
        }
      })
      .catch((e) => {
        alert(`an error occurred fetching ${resource}`, e);
      });
  };

  /**
   * Fieldname changes w/ validity check
   * @param event contains the new value
   * @param fieldName props name of field on controlled component
   */
  handleChange = (event, fieldName) => {
    let valid = false;
    const { pendingChanges } = this.state;

    if (fieldName === 'Email') {
      valid = validateEmail(event.target.value);
    } else {
      valid = true;
    }

    if (valid) {
      this.setState({
        [fieldName]: {
          value: event.target.value,
        },
        draftField: fieldName,
        editing: true,
        pendingChanges: [...new Set(pendingChanges), fieldName],
      });
    }
  };

  /**
   * iterate over pendingChanges fields, update entity, reset dirty state
   * @param event
   */
  onSubmit = (e) => {
    e.preventDefault();

    const { entity, session, dispatch } = this.props;
    const { pendingChanges, detailRecord, state } = this.state;

    pendingChanges.forEach((field) => {
      if (field in state) {
        entity[detailRecord][field] = state[field].value;

        this.setState({
          [field]: {
            isDirty: false,
          },
          pendingChanges: pendingChanges.filter(arr => arr !== field),
        });
      }
    });

    dispatch(handleEntityUpdate(session, entity.entityType, entity[detailRecord]));
  };

  render() {
    const { isDetailFetching } = this.props;
    const {
      Email, Notes, Status, picklists, pendingChanges,
    } = this.state;

    return (
      <React.Fragment>
        {isDetailFetching ? (
          <Loading isDetailFetching />
        ) : (
          <form className="container">
            {pendingChanges.length > 0 ? (
              <div>
                <button type="button" onClick={this.onSubmit}>
                  Save
                </button>
                <button type="button">Undo</button>
              </div>
            ) : null}

            <SingleInput
              inputType="text"
              title="Email"
              name="Email"
              controlFunc={this.handleChange}
              content={Email.value}
              isDirty={Email.isDirty}
              placeholder="Enter Email here"
            />
            <Textbox
              title="Notes"
              rows={2}
              name="Notes"
              content={Notes.value}
              isDirty={Notes.isDirty}
              resize
              placeholder="Enter Notes here"
              controlFunc={this.handleChange}
            />
            <PickList
              title="Status"
              name="Status"
              value={Status.value}
              controlFunc={this.handleChange}
              isDirty={Status.isDirty}
              placeholder="Lead Status"
              options={picklists ? picklists['Lead Status Web'] : []}
            />
          </form>
        )}
      </React.Fragment>
    );
  }
}

DetailContainer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  entity: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { session, entity } = state;
  const { isDetailFetching } = entity || { isDetailFetching: true };

  const stateProps = {
    session,
    entity,
    isDetailFetching,
  };

  return { ...stateProps };
}

export default connect(mapStateToProps)(DetailContainer);
