const getAllData = async () => {

	try {
		const booksResponse = await fetch('http://localhost:3003/books')

		const { data: allBooks } = await booksResponse.json()

		let countAll = allBooks.length

		allBooks.reverse().forEach( (element, index) => {
			
			const newDiv = document.createElement('DIV')
			newDiv.textContent = (countAll - (index)) + '. '  + element.book_name

			books.appendChild(newDiv)
		})

	} catch(e) {
		console.log(e)
	}

}

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
				book_author: book__author.value,
				book_count: book__count.value,
			})
		})

		const data = await response.json()
		
		if(data.status === 200) {
			form.reset()

			alert('Kitob qo\'shildi :)')

			books.textContent = ''

			getAllData()

		} else {
			
			alert('Xato ketdi :(')

		}
	} catch(e) {
		console.log(e)
	}

})

getAllData()