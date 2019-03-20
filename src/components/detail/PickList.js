import React from 'react';
import PropTypes from 'prop-types';

const PickList = (props) => (
	<div className="form-group">
	    <label className="form-label">{props.title}</label>
		<select
			name={props.name}
			value={props.value}
            onChange={(e) => props.controlFunc(e, props.name)}
            className={props.isDirty ? "dirty" : "form-select"}>

			{props.options.map(opt => {
				return (
					<option
						key={opt}
						value={opt}>{opt}
					</option>
				);
			})}
		</select>
	</div>
);

PickList.propTypes = {
	name: PropTypes.string.isRequired,
	title: PropTypes.string,
	options: PropTypes.array.isRequired,
	value: PropTypes.string.isRequired,
	controlFunc: PropTypes.func.isRequired,
	placeholder: PropTypes.string
};

export default PickList;