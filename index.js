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

app.post('/books', async (req, res) => {
	
	const INSERT_BOOK = `
		insert into
			books (book_name, book_number, book_author)
		values($1, $2, $3)
		;
	`

	const dataRes = await fetch()

	res.send({
		status: 200
	})
})

app.listen(3003, () => console.log('ready at http://localhost:3003'))
