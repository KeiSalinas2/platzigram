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
        avatar: 'https://scontent-mia1-1.cdninstagram.com/t51.2885-15/e35/11931217_1656524234562034_1926686867_n.jpg?ig_cache_key=MTA2ODMzMjA5MDk5OTgyNzUwOA%3D%3D.2'
      },
      url: 'https://scontent-mia1-1.cdninstagram.com/t51.2885-15/e35/14027202_193566661059777_649558239_n.jpg?ig_cache_key=MTMyMTEyNzIzODY3MDE4MTgwMQ%3D%3D.2',
      likes: 1024,
      liked: false,
      createdAt: new Date().getTime()
    },
    {
      user: {
        username: 'keisalinas',
        avatar: 'https://scontent-mia1-1.cdninstagram.com/t51.2885-15/e15/11333664_1420012551654182_368758025_n.jpg?ig_cache_key=OTg5MzQyMzYyOTIxNzI1MDgx.2'
      },
      url: 'https://scontent-mia1-1.cdninstagram.com/t51.2885-15/e35/14309952_304188099944150_419058921_n.jpg?ig_cache_key=MTMzNjM0MjMwMjI1OTc3Njg4Ng%3D%3D.2',
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
    avatar: 'https://scontent-mia1-1.cdninstagram.com/t51.2885-15/e35/11931217_1656524234562034_1926686867_n.jpg?ig_cache_key=MTA2ODMzMjA5MDk5OTgyNzUwOA%3D%3D.2',
    pictures: [
      {
        id: 1,
        src: 'https://scontent-mia1-1.cdninstagram.com/t51.2885-15/e35/14027202_193566661059777_649558239_n.jpg?ig_cache_key=MTMyMTEyNzIzODY3MDE4MTgwMQ%3D%3D.2',
        likes: 3
      },
      {
        id: 2,
        src: 'https://scontent-mia1-1.cdninstagram.com/t51.2885-15/e35/1516214_1466277810337049_744709052_n.jpg?ig_cache_key=MTAyNzA1NzAwOTg2Njk2MDEwOQ%3D%3D.2',
        likes: 300
      },
      {
        id: 3,
        src: 'https://scontent-mia1-1.cdninstagram.com/t51.2885-15/e35/11363630_1658644607707116_180850414_n.jpg?ig_cache_key=MTA2NjEyNTY0OTQ2MzM0MDYwNg%3D%3D.2',
        likes: 0
      },
      {
        id: 4,
        src: 'https://scontent-mia1-1.cdninstagram.com/t51.2885-15/e35/12748334_1548376118788554_2076534160_n.jpg?ig_cache_key=MTE4NjM1ODE3NTkxMzMzOTk2Nw%3D%3D.2',
        likes: 24
      },
      {
        id: 5,
        src: 'https://scontent-mia1-1.cdninstagram.com/t51.2885-15/e35/14309952_304188099944150_419058921_n.jpg?ig_cache_key=MTMzNjM0MjMwMjI1OTc3Njg4Ng%3D%3D.2',
        likes: 10
      }
    ]
  }
  res.send(user);
})

app.get('/:username', (req, res) => {
  res.render('index', {title: 'Platzigram - ${req.params.username}'} );
})

app.get('/:username/:id', (req, res) => {
  res.render('index', {title: `Platzigram - ${req.params.username}`})
})

app.listen(3000, (err) => {
	if(err) return console.log(`Something failed!`), process.ecit(0);

	console.log(`App listening on port 3000!`);
})

