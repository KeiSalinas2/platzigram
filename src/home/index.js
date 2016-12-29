var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var request = require('superagent');
var header = require('../header');
var axios = require('axios');
var axios = require('fetch');

page('/', header, asyncLoadPictures, function (ctx, next) {
  title('Platzigram');
  var main = document.getElementById('main-container');

  empty(main).appendChild(template(ctx.pictures));
})


//load pictures with superagent
function loadPictures(ctx, next) {
  request
    .get('/api/pictures')
    .end(function (err, res){
      if (err) return console.log(err);

      ctx.pictures = res.body;
      next();
    })
}

//load pictures with axioss
function loadPicturesAxios(ctx, next) {
  axios
    .get('/api/pictures')
    .then(function (res){
      ctx.pictures = res.data;
      next();
    })
    .catch(function(err){
      console.log(err);
    })
}

//load pictures with fetch
function loadPicturesFetch(ctx, next) {
  fetch('/api/pictures')
    .then(function (res){
      return res.json()
    })
    .then(function(pictures){
      ctx.pictures = pictures;
      next();
    })
    .catch(function (err){
      console.log(err);
    })
}




async function asyncLoadPictures(ctx, next) {
  try {
    ctx.pictures = await fetch('/api/pictures').then(res => res.json());
    next();
  } catch (err) {
      return console.log(err);
  }
}
