import React, { useContext } from 'react'
import './FormButton.css'
import Context from '../../Hooks/Context'

function FormButton({ page }) {
	const { setPage } = useContext(Context)
	const name = Object.keys(page)[0]
	const frontName = Object.values(page)[0]

	const changePage = (name) => {
		setPage(name)
	}

	return (
		<div className='FormButton' onClick={() => changePage(name)}>
			{frontName}
		</div>
	)
}

export default FormButton