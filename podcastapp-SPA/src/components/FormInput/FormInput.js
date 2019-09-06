import React from 'react';
import './FormInput.scss';

// Parent: sign-in, sign-up
const FormInput = ({ handleChange, label, ...otherProps }) => {
	return (<div className='group'>
		<input className='form-input' onChange={handleChange} {...otherProps} />
		{label
			? <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
				{label}
			</label>
			: null}
	</div>);
}

export default FormInput;
