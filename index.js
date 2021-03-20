const express = require('express')
const parser = require('body-parser')
const cors = require('cors')

const { fetch } = require('./src/db/db')

const PORT = process.env.PORT || 3003

const app = express()

app.use(cors())
app.use(parser.json())
app.use(parser.urlencoded({ extended: false }))

app.get('/books', async (req, res) => {

	try {
		
		const allBooks = await fetch('select * from books')

		res.send({
			status: 200,
			data: allBooks
		})

	} catch(e) {
		res.send({
			status: 500,
			error: e.message
		})
		
		console.log(e)
	}

})

app.post('/books', async (req, res) => {
		
	const { book_name, book_number, book_author, book_count, book_desc } = req.body

	const INSERT_BOOK = `
		insert into
			books (book_name, book_number, book_author, book_count, book_desc)
		values($1, $2, $3, $4, $5)
		returning book_id
		;
	`
	try {

		const [ dataRes ] = await fetch(INSERT_BOOK, book_name, book_number, book_author, book_count, book_desc)

		res.send({
			status: 200,
			data: dataRes
		})

	} catch(e) {

		res.send({
			status: 500,
			error: e.message
		})		
		console.log(e)
	}

})

app.listen(PORT, () => console.log(`ready at http://localhost:${PORT}`))
