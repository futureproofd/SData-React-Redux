/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';

/*
Controlled Component
*/
const Textbox = (props) => {
  const {
    title, isDirty, resize, name, rows, content, placeholder,
  } = props;

  return (
    <div className="form-group">
      <label htmlFor={name} id={title} className="form-label">
        {title}
      </label>
      <textarea
        id={name}
        className={isDirty ? 'dirty' : 'form-input'}
        style={resize ? null : { resize: 'none' }}
        name={name}
        rows={rows}
        value={content}
        onChange={e => props.controlFunc(e, props.name)}
        placeholder={placeholder}
      />
    </div>
  );
};

Textbox.defaultProps = {
  placeholder: 'empty',
  resize: true,
};

Textbox.propTypes = {
  title: PropTypes.string.isRequired,
  rows: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  resize: PropTypes.bool,
  placeholder: PropTypes.string,
  controlFunc: PropTypes.func.isRequired,
};

export default Textbox;
