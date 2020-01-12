//server.js
//adding opensource modules to application
var express = require('express'); //express
var path = require('path'); //for refering physical files here
var logger = require('morgan');
var cookieParser = require('cookie-parser'); //for maintain sessions
var bodyParser = require('body-parser'); //for parsing json
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport'); //Using passportjs for authentication
var LocalStrategy = require('passport-local').Strategy; //using passport strategy
var session = require('express-session'); //for maintaining sessions
var mongoose = require('mongoose'); //for mongodb, database
var models_user = require('./Angular/Models/user.js'); // refering models in server.js

const dbName = 'Todo'
let db
//connection database
mongoose.connect('mongodb://localhost/database',{ useNewUrlParser: true }, {useUnifiedTopology: true},(err,client)=>{
  if(err) return console.log('err: ',err)

  //Storing a reference to the database so you can use it later

  db = client.db(dbName)
  console.log(`Connected MongoDB : ${url}`)
  console.log(`Database : ${dbName}`)
});

//import the routers
var router = require('./Routes/router');
var authenticate = require('./Routes/authentication')(passport);

//for using express throughout this application
var app = express();

//tell node that My application will use ejs engine for rendering, view engine setup
app.set('views', path.join(__dirname, '/Views'));
app.set('view engine', 'ejs');

//tell node the global configuration about parser,logger and passport
app.use(cookieParser());
app.use(logger('dev'));
app.use(session({
  secret: 'keyboard cat',
  resave : true,
  saveUninitialized : true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize()); //initializing passport
app.use(passport.session()); //initializing passport session

//tell node about these directories that application may get resources from
app.use('/', router);
app.use('/auth', authenticate);
app.use('/scripts',express.static('./scripts'));
app.use('/Content',express.static('./Content'));
app.use('/Angular',express.static('./Angular'));
app.use('/Views/Main',express.static('./Views/Main'));
app.use('Views/Authentication',express.static('./Views/Authentication'));

//providing auth-api to passport so that it can use it.
var initPassport = require('/Passport/passport-init');
initPassport(passport);

//running server on node
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

//exporting this application as a module
module.exports = app;
