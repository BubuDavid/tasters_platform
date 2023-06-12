import React, { useContext } from 'react'
import TextField from '../TextField/TextField'
import ListField from '../ListField/ListField'
import CheckboxField from '../CheckboxField/CheckboxField'
import EmptyField from '../EmptyField/EmptyField'
import FormButton from '../FormButton/FormButton'
import './PageView.css'

function PageView({ data, setPage, currentPage }) {
	let formsField = data['fields_map'].filter(field => (
		field['field_name'] === currentPage + "_form"
	))
	formsField = formsField.length > 0 ? formsField[0] : [] 
	return (
		<div className='PageView'>
			<div
				className='page__user__button'
				onClick={() => setPage('users')}
			>Perfil</div>
			<h1 className='page__title'>{data['front_name']}</h1>

			<div className='page__data'>
				<div className='page__data__names'>
					{data['fields_map']?.map((field, index) => {
						if (field['type'] != 'form_link') return (
							<div key={ index + 'name' } className='page__field__name'>{field['front_name']}: </div>
						)
					})}
					<div className='forms__button'><a href={formsField['value']} target='_blank'>{ formsField['front_name'] }</a></div>
				</div>
				<div className='page__data__values'>
					{data['fields_map']?.map((field, index) => {
						switch (field['type']) {
							case 'text':
								return <TextField field={ field } key={index}/>
								break
							case 'list':
								return <ListField field={field} key={index}/>
								break
							case 'checkbox':
								return <CheckboxField field={field} key={index} />
								break
							defualt:
								return <EmptyField key={index}/>	
						}
					})}
				</div>
			</div>
			<div className='page__forms' >
				
				{data['all_pages']?.map((page, index) => {
					if (Object.keys(page)[0] != 'users') return (
						<FormButton key={ index } page={ page } />
					)
				})}
				</div>
		</div>
	)
}

export default PageView