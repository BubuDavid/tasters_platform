import { useEffect, useState } from "react"

function useFetchAPI(requestParams) {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const { url } = requestParams

	useEffect(() => {
		const getData = async (url, requestParams) => {
			try {
				const res = await fetch(url, requestParams)
				if (!res.ok)
					throw new Error(`Hay un error en el servidor 😱: Estatus -> ${res.status}`)
				
				let jsonData = await res.json()
				setData(jsonData)
			} catch (err) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}
		getData(url, requestParams)
	}, [])

	return {data, loading, error}
}

export default useFetchAPI