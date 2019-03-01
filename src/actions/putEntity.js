export const ENTITY_DETAIL = "ENTITY_DETAIL";
export const ENTITY_UPDATE = "ENTITY_UPDATE";

function _entityDetail(data, entityType){
    return {
        'type' : ENTITY_DETAIL,
        'entityType' : [entityType],
        'entity' : data,
        'isFetching': false
    }
}

function _entityUpdate(){
    return {
        'type' : ENTITY_UPDATE,
        'isFetching' : true
    }
}

export function handleEntityUpdate(session, entityType, data){
    return (dispatch) => {
        dispatch(_entityUpdate());
        session.sData.update(entityType, data)
            .then((res) =>{
                if(res){
                    dispatch(_entityDetail(data, entityType));
                } else {
                    console.log('error');
                } 
            }).catch(() => {
                alert('an error occurred while updating. Try again.');
            })
    }
};