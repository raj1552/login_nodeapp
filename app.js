const express = require('express')
const cors = require('cors')
const userRoutes = require('./src/router/userRoutes')
const pool = require('./db/config.js')

const app = express()
const port = 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))
app.use(cors())

app.get('/' , (req , res) =>{
    res.sendFile( __dirname + '/views/index.html')
})

app.get('/dashboard' , (req , res) =>{
    res.sendFile(__dirname + '/views/Dashboard.html')
})

app.use('/user', userRoutes)

app.listen( port , () =>{
    console.log(`Iam running on port ${port}`)
})

