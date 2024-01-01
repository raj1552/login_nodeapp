const bcrypt = require('bcrypt')
const pool = require('../../db/config')
const userQuery = require('../query/GetUserByUsernameQuery')

const authenticateUser = async (req, res , next) =>{
    const {username , password} = req.body;

    if(!username || !password){
        return res.status(401).json({error : 'Invalid credentials'})
    }

    try{
        const userResult = await pool.query( userQuery.getUserByUsername, [username])
        
        if(userResult.rowCount === 1){
            const hashedPasswordfromDB = userResult.rows[0].password
            const passwordMatch = await bcrypt.compare(password , hashedPasswordfromDB)

            if(passwordMatch){
                req.authenticatedUser = username
                next()
            }
            else{
                res.status(401).json({error : 'Invalid credentials'})
            }
        }
        else{
            res.status(401).json({error : 'Invalid credentials'})  
        }
    }
    catch(error){
        console.error(error)
        res.status(500).json({error : 'Internal Server Error'})
        
    }
}

module.exports = { authenticateUser }