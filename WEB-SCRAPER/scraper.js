const Nightmare = require('nightmare')
const express = require('express')
// const request = require('request')
// const cheerio = require('cheerio')

const app = express()

var nightmareBrowser = Nightmare({show: false})

nightmareBrowser
	.goto('<url>')
	type('<html id>', '<action>')
	click('<html button id>')
	wait('<html id of results>')

	evaluate(function(){
		//returns a value that is sent to RESULT
		//CLIENT-SIDE CODE
	})
	.end()

	.then(function(result) {
		console.log(result)
	})

let port = 80
app.listen(() => {
	console.log('running on ', port)
})