import { createContext, useState } from "react"
import useFetchAPI from "./useFetchaAPI"

const Context = createContext()

function Provider(props) {
	const searchParams = new URLSearchParams(document.location.search)
	const user_id = searchParams.get('user_id')
	const [page, setPage] = useState(searchParams.get('page') ? searchParams.get('page'):'users')


	const url = process.env.REACT_APP_API_URL + '?' + new URLSearchParams({
		user_id: user_id ? user_id: '',
		page: page ? page : ''
	})
	const {
		data,
		loading,
		error
	} = useFetchAPI(page, { url: url })

	return (
		<Context.Provider value={{
			page, setPage,
			data,
			loading,
			error,
			user_id
		}}>
			{ props.children }
		</Context.Provider>
	)
}

export default Context
export { Provider }