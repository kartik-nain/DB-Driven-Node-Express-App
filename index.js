const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const passport = require('passport')
const exphbs = require('express-handlebars'); 

const mongoose = require('mongoose')

require('dotenv').config()
const port = process.env.port

app.use(express.static('public'));

app.engine('.hbs',exphbs.engine(
    {extname:'.hbs'}))

app.set('view engine','.hbs')

app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
//Connecting to database
mongoose.connect(process.env.mongoDBUrl).then(() => console.log("Connected to MongoDB"), (err) => console.log(err))

//Importing the sales module 
const sales = require('./routes/api/sales')
app.use('/api/sales', sales) //Handling http requests to /api/sales path and associating it with sales module to handle the requests.

const auth = require('./routes/api/users')
app.use('/api/auth', auth)

// Config for JWT strategy
require('./strategies/jwt-strategy')(passport)

app.listen(port, () => console.log(`App running at port : ${port}`))