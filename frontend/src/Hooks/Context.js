import { createContext, useState } from "react"
import useFetchAPI from "./useFetchaAPI"

const Context = createContext()

function Provider(props) {
	const [page, setPage] = useState('')
	
	const url = process.env.REACT_APP_API_URL + '?' + new URLSearchParams({
		user_id: 'recLEKWTce2wVgoMr',
	})
	const {
		data,
		loading,
		error
	} = useFetchAPI({ url: url })

	return (
		<Context.Provider value={{
			page, setPage,
			data,
			loading,
			error
		}}>
			{ props.children }
		</Context.Provider>
	)
}

export default Context
export { Provider }