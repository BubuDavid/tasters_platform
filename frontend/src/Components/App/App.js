import React, { useContext } from 'react'
import Context from '../../Hooks/Context'
import PageView from '../PageView/PageView'
import './App.css'

function App() {
	const { data, loading, error } = useContext(Context)

	console.log(data)

	return (
		<>
			{loading && <h1>Cargando... 🐱‍🚀</h1>}

			{error ? (
					<div>
						<h3>{`😱 Hay un error en el servidor👇`}</h3>
						<h2><b>{`Status -> ${error}`}</b></h2>
					</div>
			) : null}

			{!loading && (
				<PageView data={data} />
			)}
			
		</>
	)
}

export default App