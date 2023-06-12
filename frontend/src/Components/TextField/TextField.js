import React from 'react'
import EmptyField from '../EmptyField/EmptyField'

function TextField({ field }) {
	return (<>
		{field["value"] ? <div className='TextField'>{ field['value'] }</div>: <EmptyField />}
	</>)
}

export default TextField