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
db.once('open', function(){
  console.log('Connected to MongoDB') ;
}) ;
db.on('error', function(err){
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
// set public folder
app.use(express.static(path.join(__dirname,'public')));
//load view engine
app.set('views', path.join(__dirname,'views')) ;
app.set('view engine', 'pug') ;
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
  
app.get('/articles/add', function(req,res){
              res.render('add_articles',{title: 'Add Article'
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
});
app.get('/articles/:id', function(req,res){
  Article.findById(req.params.id, function(err,article){
  //  console.log(article) ;
  res.render('article',{
    article:article
    });
  });
});


app.listen(3200, function(){
  console.log('Server strted on port 3200 ...');
});
