import React from 'react'
import EmptyField from '../EmptyField/EmptyField'
import './ListField.css'

function ListField({ field }) {
	return (<div className='ListField'>
		{field['value'] ? field['value'].map((listItem, index) => (
			<div key={ index } className='list__item'>{listItem}</div>
		)): <EmptyField />}
	</div>
	)
}

export default ListField