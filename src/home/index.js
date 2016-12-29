var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');



page('/', function (ctx, next) {
  title('Platzigram');
  var main = document.getElementById('main-container');

  var pictures= [
    {
      user: {
        username: 'keisalinas',
        avatar: 'https://gemintherough.files.wordpress.com/2015/08/mr-robot_fsociety.jpg'
      },
      url: 'http://materializecss.com/images/office.jpg',
      likes: 1024,
      liked: false,
      createdAt: new Date()
    },
    {
      user: {
        username: 'keisalinas',
        avatar: 'https://gemintherough.files.wordpress.com/2015/08/mr-robot_fsociety.jpg'
      },
      url: 'http://materializecss.com/images/office.jpg',
      likes: 24,
      liked: true,
      createdAt: new Date().setDate(new Date().getDate() - 10)
    }
  ];

  empty(main).appendChild(template(pictures));
})
