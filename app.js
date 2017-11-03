const express = require('express');
const path = require('path') ;
// mongo db changes
const mongoose = require('mongoose') ;
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

//bring models from model folder just created
let Article = require('./models/article');

//init App
const app = express();
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
    

    //console.log('Submitted Form');
    return;

});


  app.get('/articles/add', function(req,res){
            res.render('add_articles',{title: 'Add Article'
      });
    });

app.listen(3200, function(){
  console.log('Server strted on port 3200 ...');

});
