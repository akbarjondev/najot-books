form.addEventListener('submit', async (evt) => {

	evt.preventDefault()

	try {

		const response = await fetch('http://localhost:3003/books', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				book_name: book__name.value,
				book_number: book__number.value,
				book_author: book__author.value
			})
		})

		const data = await response.json()
		
		console.log(data)
	} catch(e) {
		console.log(e)
	}

})
