/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';

const PickList = (props) => {
  const {
    title, name, value, isDirty, options,
  } = props;
  return (
    <div className="form-group">
      <label htmlFor={name} id={title} className="form-label">
        {title}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={e => props.controlFunc(e, name)}
        className={isDirty ? 'dirty' : 'form-select'}
      >
        {options.map(opt => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

PickList.defaultProps = {
  title: 'title',
};

PickList.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  controlFunc: PropTypes.func.isRequired,
};

export default PickList;
