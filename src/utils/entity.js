import { entityTypes } from '../config/config';

const getEntityType = (props) => {
  if (props.entity && props.location) {
    for (let i = 0; i < entityTypes.length; i += 1) {
      if (props.entity[entityTypes[i]]) {
        const entity = props.location.pathname; // ex string: leads/id
        if (entity.indexOf(entityTypes[i].toLowerCase()) > 0) {
          return entityTypes[i].toLowerCase();
        }
      }
    }
  } else {
    return '';
  }
};

export default getEntityType;
