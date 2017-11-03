const express = require('express');
const path = require('path') ;
// mongo db changes
const mongoose = require('mongoose') ;
//body PARSER
const bodyParser = require('body-parser') ;
// init DB
mongoose.connect('mongodb://localhost/nodekb') ;
db = mongoose.connection;

//check for DB ERR
db.once('open', function()
{
  console.log('Connected to MongoDB') ;
}) ;
db.on('error', function(err)
{
  console.log(err) ;
}
);

//init App
const app = express();

//bring models from model folder just created
let Article = require('./models/article');
// BODY PARSER MIDDLEWARE
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


//load view engine
app.set('views', path.join(__dirname,'views')) ;
app.set('view engine', 'pug') ;

//home route commented now using Mongo DB
/*app.get('/', function(req,res){
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
*/

// code for mongo DB

app.get('/', function(req,res){
  Article.find({}, function(err, articles){
    if(err){
      console.log(err)
    }else{
      res.render('index',{
                          title: 'Articles',
                          articles: articles
                        });
    }
    });
  });

// POSt action over here
  app.post('/articles/add', function(req,res)
{   let article = new Article() ;
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save(function(err){
      if(err){
        console.log(err);
        return;
      }else{
        res.redirect('/') ;
      }
    });



    //console.log('Submitted Form change 5');
  //  return;

});


  app.get('/articles/add', function(req,res){
            res.render('add_articles',{title: 'Add Article'
      });
    });

app.listen(3200, function(){
  console.log('Server strted on port 3200 ...');

});
