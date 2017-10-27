const express = require('express');
const path = require('path') ;

//init App
const app = express();

//load view engine
app.set('views', path.join(__dirname,'views')) ;
app.set('view engine', 'pug') ;

//home route
app.get('/', function(req,res){
    //  res.send('Hello World');
      //res.render('index') ;
      // GIT change jvhjkgsdfhgdfglsdfgjkfh
      res.render('index',{title: 'Articles'});
  });

app.listen(3200, function(){
  console.log('Server strted on port 3200 ...');

});
