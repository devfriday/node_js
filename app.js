const express = require('express');
const path = require('path') ;

//init App
const app = express();

//load view engine
app.set('views', path.join(__dirname,'views')) ;
app.set('view engine', 'pug') ;

//home route
app.get('/', function(req,res){
    let articles = [
      {
        id:1,
        title:'Article One',
        author:'Auth 1',
        body: 'This is art 1'
      },
      {
        id:2,
        title:'Article Two',
        author:'Auth 2',
        body: 'This is art 2'
      },
      {
        id:3,
        title:'Article Three',
        author:'Auth 3',
        body: 'This is art 3'
      }
    ];
          res.render('index',{
            title: 'Articles',
            articles: articles
    });
  });

  app.get('/articles/add', function(req,res){
            res.render('add_articles',{title: 'Add Article'
      });
    });

app.listen(3200, function(){
  console.log('Server strted on port 3200 ...');

});
