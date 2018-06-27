const express = require('express')
const path = require('path')
const http = require('http')
const PORT = process.env.PORT || 5000
const app = express()

var bcrypt = require('bcrypt')
//let models = require('./models')
let db = require('./models')
const exphbs = require('express-handlebars')
let session = require('express-session')
let bodyParser = require('body-parser')


const setVars = require("./setEnvironmentVars.js")
setVars.setEnvironmentVariables()

const { Pool } = require('pg')
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})

//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.bodyParser());
//app.use(express.methodOverride());
//app.use(app.router);

app.engine('handlebars',exphbs())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  secret: 'doge',
  resave: false,
  saveUninitialized: false
}))

app.use(express.static(path.join(process.env.ROOT_DIR, 'public')))
app.set('views', path.join(process.env.ROOT_DIR, 'views'))
app.set('view engine', 'handlebars')

app.get('/login', (req, res) => res.render('login'))

app.post('/login', (req, res) => {
console.log('login REEEEEE')
console.log(req.body.email)
console.log(req.body.password)
bcrypt.compare(req.body.password, user.password, function(err, res) {
    res.redirect('/')
})



})

//verify matching username and password

//set that session BOI

/*
  req.session.username = username
  // setting the expiration date of the cookies so we can
  // come back later even if we close the browser
  var hour = 3600000
  req.session.cookie.expires = new Date(Date.now() + hour)
  req.session.cookie.maxAge = hour

  res.render('login')
} */

app.get('/', (req, res) => {

  db.UserProfile.findAll().then(function(users){
    console.log(users)
    res.render('users', {userslist: users})
  })
})



app.get('/register', (req, res) => res.render('register'))

app.post('/register', (req, res) => {

bcrypt.hash(req.body.password, 10, function(err, hash) {
  let newUser = db.UserProfile.build({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    dob: req.body.dob,
    email: req.body.email,
    sexpref: req.body.sexpref,
    gender: req.body.gender,
    password: hash,
    bio: '',
    youngest: 18,
    oldest: 100,
  })
  // save the student in the database
  newUser.save().then(function(savedUser){
    //console.log(savedUser)
  }).then(function(){
    res.redirect('/')
  })
  })
  //check if email already exists in users table !!!
})

app.post('/deleteUser', (req, res) => {
  db.UserProfile.destroy({
    where: {
      id : req.body.userid
    }
    }).then(function(){
      res.redirect('/')
  })
})

/* app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM test_table');
    res.render('pages/db', result);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}) */
db.sequelize.sync().then(function() {
  http.createServer(app).listen(PORT, function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
})
