'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express ();

app.set('view engine', 'pug')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.render('index');
})

app.get('/signup', (req, res) => {
	res.render('index');
})

app.get('/signin', (req, res) => {
	res.render('index');
})

app.listen(3000, (err) => {
	if(err) return console.log(`Something failed!`), process.ecit(0);

	console.log(`App listening on port 3000!`);
})

