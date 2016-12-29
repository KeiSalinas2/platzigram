'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express ();

app.set('view engine', 'pug')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.render('index', {title: 'Platzigram'} );
})

app.get('/signup', (req, res) => {
	res.render('index', {title: 'Platzigram - Signup'} );
})

app.get('/api/pictures', (req, res) => {
  var pictures= [
    {
      user: {
        username: 'keisalinas',
        avatar: 'https://gemintherough.files.wordpress.com/2015/08/mr-robot_fsociety.jpg'
      },
      url: 'http://materializecss.com/images/office.jpg',
      likes: 1024,
      liked: false,
      createdAt: new Date().getTime()
    },
    {
      user: {
        username: 'keisalinas',
        avatar: 'https://gemintherough.files.wordpress.com/2015/08/mr-robot_fsociety.jpg'
      },
      url: 'http://materializecss.com/images/office.jpg',
      likes: 1,
      liked: true,
      createdAt: new Date().setDate(new Date().getDate() - 10)
    }
  ];

  setTimeout(function (){
    res.send(pictures);
  }, 2000)

})

app.get('/signin', (req, res) => {
	res.render('index', {title: 'Platzigram - Signin'} );
})

app.listen(3000, (err) => {
	if(err) return console.log(`Something failed!`), process.ecit(0);

	console.log(`App listening on port 3000!`);
})

