const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParer = require('body-parser')
const csp = require('express-csp-header');
let nodemailer = require("nodemailer")
let fs = require('fs')
let alert = require('alert');  

mongoose.connect('mongodb://localhost/spamlist');
let db = mongoose.connection;
var text = "Lo and behold, default spam message is here..";
//database connection

// connectDB();

async function send_spam(address) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        secureConnection: false,
        port: 587,
        tls: {
            ciphers: 'SSLv3'
        },
        auth: {
            user: "cdutboryslav@gmail.com",
            pass: "cdut2020"

        }
    });
    let result = await transporter.sendMail({
        from: "cdutboryslav@gmail.com",
        to:   address,
        text: text,
        subject: "SPAM"
    });
}

db.once('open', function(){
  console.log('Connected to mongodb!');
});

db.on('error', function(err) {
  console.log(err);

});
// Init App

const app = express();
// Bring in Models
let Article = require('./models/article');

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());
// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Home Route
app.get('/', function (req, res) {
  Article.find({}, function (err, articles) {
    if (err) {
      console.log(err);
    } else {
      console.log("length = " + articles.length);
      res.render('index', {
        title: 'Victims',
        articles: articles
      });
    }
  });
});

app.get('/articles/add', function (req, res) {
      res.render('add_article', {
        title: 'Victims'
  });
});

app.get('/spam', function (req, res) {
    Article.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      send_spam(user.mail);
    });

    alert("Message sent successfully")
    res.redirect('/');  
    });
});

// function

//get single article
app.get('/articles/:id', function(req, res){
  Article.findById(req.params.id, function(err, article){
    res.render('article', {
      title: 'Add victim', article : article
    });
  });

app.get('/msg', function(req, res){
    res.render('edit_msg', {
      title: 'Edit your message', 
      msg : text
    });
  });

app.post('/msg/:id', function(req, res){
  text = req.params.id;
  res.redirect('/')
});

app.post('/msg', function(req, res){
  text = req.body.msg1;
  console.log(text);
  res.redirect('/')
});

// app.post('/msg', function (req, res) {
//    text = req.body.msg;
//    console.log(text)
//    res.redirect('/');
// });


app.get('/articles/edit/:id', function(req, res){
  Article.findById(req.params.id, function(err, article){
    res.render('edit_article', {
      title: 'Edit victim details', article : article
    });
    });
  });

});
app.post('/articles/add', function (req, res) {
  let article = new Article();
  article.name = req.body.name;
  article.mail = req.body.mail;
  article.save(function(err) {
    if(err){
      console.log(err);
      return;
    } else {
     res.redirect('/');
    }  
  });
});

app.post('/articles/edit/:id', function (req, res) {
  let article = {};
  article.name = req.body.name;
  article.mail = req.body.mail;
  let query = {_id:req.params.id}

  Article.update(query, article, function(err) {
    if(err){
      console.log(err);
      return;
    } else {
     res.redirect('/');
    }  
  });
});


app.delete('/articles/:id', function(req, res){
  let query = {_id:req.params.id};
 
  Article.remove(query, function(err){
    if(err){
      console.log(err);
    }
    res.send('Success');
  })
});
// Route Files
// app.use('/articles', articles);
// app.use('/users', users);
// app.use(csp({
//     policies: {
//         'default-src': [csp.NONE],
//         'img-src': [csp.SELF],
//     }
// }));

// Start Server
app.listen(3000, function () {
  console.log('Server started on port 3000...');
});
