const express = require('express')
const ejs = require('ejs')
const parser = require('body-parser')

const { fetch } = require('./src/db/db')

const app = express()

app.set('views', __dirname + '/public/')
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')

app.use(express.static('public'))
app.use(parser.json())
app.use(parser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	res.renderFile('index.html')
})

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
			error: e
		})
		
		console.log(e)
	}

})

app.post('/books', async (req, res) => {
		
	const { book_name, book_number, book_author } = req.body

	const INSERT_BOOK = `
		insert into
			books (book_name, book_number, book_author)
		values($1, $2, $3)
		returning book_id
		;
	`
	try {

		const [ dataRes ] = await fetch(INSERT_BOOK, book_name, book_number, book_author)

		res.send({
			status: 200,
			data: dataRes
		})

	} catch(e) {

		res.send({
			status: 500,
			error: e
		})		
		console.log(e)
	}

})

app.listen(3003, () => console.log('ready at http://localhost:3003'))
