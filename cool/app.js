var tools = require('./tools');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParer = require('body-parser')
const csp = require('express-csp-header');
let fs = require('fs');
var url = require('url');
let alert = require('alert');  
var config = require('./config.js');
mongoose.connect('mongodb://localhost/coolsite');
let db = mongoose.connection;

db.once('open', function(){ console.log('Connected to mongodb!');});
db.on('error', function(err) { console.log(err);});

const app = express();
let Application = require('./models/application');
let Course = require('./models/course');
let Ukraine = require('./models/ukraine');
let Candidate = require('./models/candidate');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let paths = ['/', '/courses',  '/about'];
let en_paths = ['/en', '/en/courses',  '/en/about'];
let menu_pairs = [];
menu_pairs['uk'] = config['uk'].menu_items.map((e, i) => [e, paths[i]]);
menu_pairs['en'] = config['en'].menu_items.map((e, i) => [e, en_paths[i]]);

// ------GET--------
//lang
app.get('/', function (req, res) {
  res.render('index', {
    domain : config.domain,
    imgsrc : config.imgsrc,
    color : config.color,
    data : config['uk'].welcome,
    form : config['uk'].form,
    lang : 'uk',
    current : '/',
    links : menu_pairs['uk']
    });    
});

app.get('/en', function (req, res) {
  res.render('index', {
    domain : config.domain,
    imgsrc : config.imgsrc,
    color : config.color,
    lang : 'en',
    form : config['en'].form,
    data : config['en'].welcome,
    current : '/en',
    links : menu_pairs['en']
    });    
});

app.get('/applications', function (req, res) {
  Application.find({}, function (err, applications) {
    if (err) {
      console.log(err);
    } else {
      res.render('applications', {
        domain : config.domain,
        applications: applications,
        current : '/applications',
        links : menu_pairs,
        imgsrc : config.imgsrc,
        color : config.color        
      });
    }
  });
});


app.get('*?/about', function (req, res) {
  var code = tools.get_lang(req);
  console.log(code==='en' ? '/en/about' : '/about');
      res.render('about', {
        title: "About",
        links: menu_pairs[code],
        data : config[code].about,
        form : config[code].form,
        lang : (code==='en' ? 'en' : 'uk'),
        domain : config.domain,        
        color : config.color,
        current: (code==='en' ? '/en/about' : '/about')
  });
});


app.get('/:lang/confirm/:id', function(req, res){
  Candidate.findById(req.params.id, function(err, cand){
    let application = new Application();  
    application.name = cand.name;
    application.surname = cand.surname;
    application.mail = cand.mail;
    application.phone = cand.phone;
    application.text = cand.text;
    application.save(function(err) {
      if(err){
        console.log(err);
        return;
      }
    });
    Candidate.deleteOne({ _id: req.params.id }, function(err) {
      if (err) { console.log(err);}
    });

    res.render('confirmation', {
      links: menu_pairs[req.params.lang],
      domain : config.domain,
      color : config.color,
      current : '/0',
      name : application.name,
      data : config[req.params.lang].approve
    });
  });
});

app.get('*?/courses', function (req, res) {
  var code = tools.get_lang(req);  
  tools.localize(code);
  tools.prepare_data(code);
      res.render('courses', {
        title: 'Victims',
        links: menu_pairs[code],
        form : config[code].form,    
        domain : config.domain,   
        lang : (code==='en' ? 'en' : 'uk'),
        color : config.color,
        current: (code==='en' ? '/en/courses' : '/courses')
  });
});

app.get('/courses/add', function (req, res) {
      res.render('add_course', {
        title: 'Victims',
        links: menu_pairs,
        domain : config.domain,     
        color : config.color,      
        current: '/courses/add'
  });
});
app.get('/data/', function (req, res) {
  const file = `${__dirname}/public/data/data.txt`;
  res.download(file); 
});

app.get('/applications/:id', function(req, res){
  Application.findById(req.params.id, function(err, application){
      res.render('application', {
      application: application,
      links: menu_pairs,
      domain : config.domain,
      color : config.color,
      current: '/about'
    });
  });
});


//----------POST-------------------------
app.post('/:lang/apply', function (req, res) {
  if(config.verification){
    let application = new Candidate();  
    application.name = req.body.name;
    application.surname = req.body.surname;
    application.mail = req.body.mail;
    application.phone = req.body.phone;
    application.text = req.body.text;
    application.active = true;
    application.save(function(err) {
    if(err){
      console.log(err);
      return;
    } else {
      tools.send_mail(application.mail, application._id, req.params.lang);      
      res.redirect('/');
    }  
  });
  } else{
    let application = new Application();  
    application.name = req.body.name;
    application.surname = req.body.surname;
    application.mail = req.body.mail;
    application.phone = req.body.phone;
    application.text = req.body.text;
    application.save(function(err) {
      if(err){
        console.log(err);
        return;
      } else {
        res.redirect('/');
      }
    });
  }
});

app.post('/courses/add', function (req, res) {
  let course = new Course();  
  course.name = req.body.name;
  course.info = req.body.info;
  course.save(function(err) {
    if(err){
      console.log(err);
      return;
    } else {
    }  
  });
  course = new Ukraine();  
  course.name = req.body.name2;
  course.info = req.body.info2;
  course.save(function(err) {
    if(err){
      console.log(err);
      return;
    } else {
     res.redirect('/');
    }  
  });

});

//-------------DELETE-----------------------------
app.delete('/applications/:id', function(req, res){
  let query = {_id:req.params.id};
  Application.deleteOne(query, function(err){
    if(err) console.log(err);    
    res.send('Success');
  })
});

app.listen(3000, function () {
  console.log('Server started on port 3000...');
});