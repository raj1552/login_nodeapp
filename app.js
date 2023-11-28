const express = require('express')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt');
const { Pool } = require('pg')
const app = express()
const cors = require('cors')
const port = 5000

dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))
app.use(cors())

const pool = new Pool({
    user : process.env.PG_USER,
    host : process.env.PG_HOST,
    database :process.env.PG_DATABASE,
    password :process.env.PG_PASSWORD,
    port : process.env.PG_PORT
})

app.get('/' , (req , res) =>{
    res.sendFile( __dirname + '/views/index.html')
})

app.get('/dashboard' , (req , res) =>{
    res.sendFile(__dirname + '/views/Dashboard.html')
})

app.get('/user/register' , async(req , res) =>{
    const UserResult = await pool.query('Select * FROM users;')
    res.json(UserResult.rows)
})

app.post('/user/register' , async(req , res) =>{
    const { username } = req.body
    const { password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    if(!username || !password){
        return res.json({error : 'Empty Body'})
    }

    try{
        const userRegisteration = await pool.query('INSERT INTO users (username, password) values ($1, $2);', [username, hashedPassword])
        res.json(userRegisteration.rows)
    }
    catch(error){
        console.log(error)
    }
})

app.post('/user/login', async(req, res) =>{
    const { username } = req.body
    const { password } = req.body

    if(!username || !password){
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    try{
        const userResult = await pool.query('SELECT username, password FROM users WHERE username = $1', [username])

        if (userResult.rowCount === 1) {
            const hashedPasswordFromDB = userResult.rows[0].password;
            const passwordMatch = await bcrypt.compare(password, hashedPasswordFromDB);

            if(passwordMatch) {
                res.json({ success: true });
            }
            else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
           
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    }
    catch(error){
        console.error(error)
    }
})

app.listen( port , () =>{
    console.log(`Iam running on port ${port}`)
})

