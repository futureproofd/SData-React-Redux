import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/form.css';

/*
Controlled Component
*/
const SingleInput = (props) => (
    <div className="form-group">
        <label className="form-label">{props.title}</label>
        <input
            className={props.isDirty ? "dirty" : "form-input"}
            name={props.name}
            type={props.inputType}
            value={props.content}
            onChange={(e) => props.controlFunc(e, props.name)}
            placeholder={props.placeholder} 
        />
    </div>
);

SingleInput.propTypes = {
	inputType: PropTypes.oneOf(['text', 'number']).isRequired,
	title: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	controlFunc: PropTypes.func.isRequired,
	content: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
    ]).isRequired,
	placeholder: PropTypes.string,
};

export default SingleInput;