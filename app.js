import express from 'express'
import cors from 'cors'
import userRoutes from './src/router/userRoutes.js'
import authenticateToken from './src/middleware/authenticateToken.js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors());
app.use(express.static('public'))
app.use(cookieParser());

app.get('/' , (req , res) =>{
    res.sendFile( process.cwd() + '/views/index.html')
})

app.get('/dashboard', authenticateToken, (req , res) =>{
    res.sendFile( process.cwd()  + '/views/Dashboard.html')
})

app.get('/workout', authenticateToken, (req , res) =>{
    res.sendFile( process.cwd()  + '/views/Workout.html')
})

app.get('/goals', authenticateToken, (req , res) =>{
    res.sendFile( process.cwd()  + '/views/Goals.html')
})

app.get('/myschedule', authenticateToken, (req , res) =>{
    res.sendFile( process.cwd()  + '/views/Schedule.html')
})

app.get('/myprogess', authenticateToken, (req , res) =>{
    res.sendFile( process.cwd()  + '/views/Progess.html')
})

app.use('/user', userRoutes)

app.get('*', (req, res) =>{
    res.sendFile( process.cwd()  + '/views/404Error.html')
})

app.listen( port , () =>{
    console.log(`Iam running on port ${port}`)
})

