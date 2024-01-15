import express from 'express'
import cors from 'cors'
import userRoutes from './src/router/userRoutes.js'
import authenticateToken from './src/middleware/authenticateToken.js'
import cookieParser from 'cookie-parser'

const app = express()
const port = 5000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('public'))
app.use(cookieParser());

app.get('/' , (req , res) =>{
    res.sendFile( process.cwd() + '/views/index.html')
})

app.get('/dashboard', authenticateToken, (req , res) =>{
    res.sendFile( process.cwd()  + '/views/Dashboard.html')
})

app.use('/user', userRoutes)

app.listen( port , () =>{
    console.log(`Iam running on port ${port}`)
})

