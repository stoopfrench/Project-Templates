const express = require('express')
// const request = require('request')

const app = express()

app.use(express.static('./public'))

app.get('/', (req, res) => {
	res.sendFile('./public/html/index.html', { root: './'})
	console.log('sent index.html')
})

// EXPRESS SERVER ==================================

let port = 8080

app.listen(port, () => {
	console.log('... running on ', port)
})
