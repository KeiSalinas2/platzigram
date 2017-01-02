'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express ();
const multer = require('multer');
const ext = require('file-extension');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, +Date.now() + '.' + ext(file.originalname))
  }
})

let upload = multer({ storage: storage }).single('picture');

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

  setTimeout( () => res.send(pictures))

})

app.post('/api/pictures', function (req, res) {

  upload(req, res, function (err) {
    if (err) {
      return res.status(500).send('Error uploading file');
    }
    res.send("File uploaded");
  })
})

app.get('/signin', (req, res) => {
	res.render('index', {title: 'Platzigram - Signin'} );
})

app.get('/api/user/:username', (req, res) => {
  const user= {
    username: 'keisalinas',
    avatar: 'https://gemintherough.files.wordpress.com/2015/08/mr-robot_fsociety.jpg',
    pictures: [
      {
        id: 1,
        src: 'https://gemintherough.files.wordpress.com/2015/08/mr-robot_fsociety.jpg',
        likes: 3
      },
      {
        id: 2,
        src: 'https://gemintherough.files.wordpress.com/2015/08/mr-robot_fsociety.jpg',
        likes: 300
      },
      {
        id: 3,
        src: 'https://gemintherough.files.wordpress.com/2015/08/mr-robot_fsociety.jpg',
        likes: 0
      },
      {
        id: 4,
        src: 'https://gemintherough.files.wordpress.com/2015/08/mr-robot_fsociety.jpg',
        likes: 24
      },
      {
        id: 5,
        src: 'https://gemintherough.files.wordpress.com/2015/08/mr-robot_fsociety.jpg',
        likes: 10
      }
    ]
  }
  res.send(user);
})

app.get('/:username', (req, res) => {
  res.render('index', {title: 'Platzigram - ${req.params.username}'} );
})

app.listen(3000, (err) => {
	if(err) return console.log(`Something failed!`), process.ecit(0);

	console.log(`App listening on port 3000!`);
})

