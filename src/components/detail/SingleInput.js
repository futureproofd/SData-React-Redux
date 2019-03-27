/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/form.css';

/*
Controlled Component
*/
const SingleInput = (props) => {
  const {
    title, isDirty, name, inputType, content, placeholder,
  } = props;

  return (
    <div className="form-group">
      <label htmlFor={name} id={name} className="form-label">
        {title}
      </label>
      <input
        id={name}
        className={isDirty ? 'dirty' : 'form-input'}
        name={name}
        type={inputType}
        value={content}
        onChange={e => props.controlFunc(e, props.name)}
        placeholder={placeholder}
      />
    </div>
  );
};

SingleInput.defaultProps = {
  placeholder: 'none',
};

SingleInput.propTypes = {
  inputType: PropTypes.oneOf(['text', 'number']).isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  controlFunc: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  placeholder: PropTypes.string,
};

export default SingleInput;
