const express = require('express')
const app = express()

const settings = require('./config/settings')
const mongoose = require('mongoose')

const port = 8000


//Connecting to database
mongoose.connect(settings.mongoDBUrl).then(() => console.log("Connected to MongoDB"), (err) => console.log(err))

//Importing the sales module 
const sales = require('./routes/api/sales')
app.use('/api/sales', sales) //Handling http requests to /api/sales path and associating it with sales module to handle the requests.


app.listen(port, () => console.log(`App running at port : ${port}`))