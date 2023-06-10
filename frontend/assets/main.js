async function fetch_data(url) {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const userId = urlParams.get('id')

	console.log(userId)

	const res = await fetch(
		url + '?' + new URLSearchParams({
    	id: userId,
		})
	)

	const data = await res.json()

	console.log(data)
}

url = 'http://localhost:8000/user_data'

fetch_data(url)