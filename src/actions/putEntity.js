export const ENTITY_DETAIL = 'ENTITY_DETAIL';
export const ENTITY_UPDATE = 'ENTITY_UPDATE';

function entityDetail(data, entityType) {
  return {
    type: ENTITY_DETAIL,
    entityType: [entityType],
    entity: data,
    isFetching: false,
  };
}

function entityUpdate() {
  return {
    type: ENTITY_UPDATE,
    isFetching: true,
  };
}

export function handleEntityUpdate(session, entityType, data) {
  return (dispatch) => {
    dispatch(entityUpdate());
    session.sData
      .update(entityType, data)
      .then((res) => {
        if (res) {
          dispatch(entityDetail(res, entityType));
        } else {
          console.log('error');
        }
      })
      .catch(() => {
        alert('an error occurred while updating. Try again.');
      });
  };
}
