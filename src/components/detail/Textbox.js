import React from 'react';
import PropTypes from 'prop-types';

/*
Controlled Component
*/
const Textbox = (props) => (
	<div className="form-group">
		<label className="form-label">{props.title}</label>
		<textarea
			className="form-input"
			style={props.resize ? null : {resize: 'none'}}
			name={props.name}
			rows={props.rows}
			value={props.content}
            onChange={(e) => props.controlFunc(e, props.name)}
			placeholder={props.placeholder} />
	</div>
);

Textbox.propTypes = {
	title: PropTypes.string.isRequired,
	rows: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	resize: PropTypes.bool,
	placeholder: PropTypes.string,
	controlFunc: PropTypes.func.isRequired
};

export default Textbox;