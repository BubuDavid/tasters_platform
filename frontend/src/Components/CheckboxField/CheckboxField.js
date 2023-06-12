import React from 'react'
import './CheckboxField.css'

function CheckboxField({ field }) {
	return (
		<div className='CheckboxField'>
			{field['value'] ? '✅': '❌'}
		</div>
	)
}

export default CheckboxField