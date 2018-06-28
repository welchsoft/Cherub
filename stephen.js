//const models = require('./models')
let express = require('express')
let app = express()
const exphbs = require('express-handlebars')
var bodyParser = require('body-parser')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.engine('handlebars', exphbs())
app.set('views', './views')
app.set('view engine', 'handlebars')


app.get('/', (req, res)=>{
    res.render('landing')
})

app.use(express.static('public'))

app.post('/', (req, res)=>{
    let email = req.body.register_email
    let password = req.body.register_password
    let gender = req.body.optradio
    let sexpref = req.body.optradio2
    console.log("works!")
    console.log(email)
    console.log(password)
    console.log(gender)
    console.log(sexpref)

    // const list = models.list.build({
    //     name: name
    // })
    // list.save().then((newList)=>{
    //     console.log(newList)
    // })
})


app.get('/profile',(req, res)=>{
  res.render('profile')
})

app.post('/register', (req, res)=>{
  console.log("TRIGGERED!")
  let firstname = req.body.firstname
  let lastname = req.body.lastname
  let email = req.body.register_email
  let password = req.body.register_password
  let dob = req.body.dob //year/month/day
  let sexpref = req.body.sexpref
  let gender = req.body.gender
  console.log(firstname)
  console.log(lastname)
  console.log(email)
  console.log(password)
  console.log(dob)
  console.log(sexpref)
  console.log(gender)
  res.render('profile')
})

app.post('/login', (req, res)=>{
  let email = req.body.login_email
  let password = req.body.login_password
  console.log(email)
  console.log(password)
  res.render('profile')
})


function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }



app.listen(3000, ()=>console.log('cherub app is listening on port 3000!'))





/* creating and saving a model

let post = models.Post.build({
  title: 'Hello Sequelize',
  body: 'Body 2',
  ispublished: true,
  username : 'marydoe'
})

post.save().then(function(newPost){
  console.log(newPost)
}) */