const express = require('express')
const app = express()

const mongoose = require('mongoose')

require('dotenv').config()
const port = process.env.port

app.use(express.json())

//Connecting to database
mongoose.connect(process.env.mongoDBUrl).then(() => console.log("Connected to MongoDB"), (err) => console.log(err))

//Importing the sales module 
const sales = require('./routes/api/sales')
app.use('/api/sales', sales) //Handling http requests to /api/sales path and associating it with sales module to handle the requests.


app.listen(port, () => console.log(`App running at port : ${port}`))