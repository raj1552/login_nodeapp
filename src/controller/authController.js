import bcrypt from "bcrypt"
import pool from "../../db/config.js"
import query from "../query/CreateUser.js"
import userQuery from "../query/GetUserByUsernameQuery.js";
import jwt from 'jsonwebtoken'

const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(422).json({ error: "Username & Password is required!" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const { rows } = await pool.query(query.getUserByUsernameAndPassword, [ username, hashedPassword,]);
        res.json({ success: true, body: { user: rows[0] } });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Something went wrong!" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
    
        if (!username || !password) {
          return res.status(401).json({ error: "Invalid credentials" });
        }
        const { rows }= await pool.query(userQuery.getUserByUsername, [ username]);
        var token = jwt.sign({username : username}, '12345')
        console.log(token)
    
        if (rows.length === 0) {
            res.status(401).json({ error: "Invalid credentials" });
            return
        }
    
          const hashedPasswordfromDB = rows[0].password
          const passwordMatch = await bcrypt.compare( password, hashedPasswordfromDB);
          if(!passwordMatch){
            res.status(401).json({ error: "Invalid credentials" });
            return
          }
    
          req.authenticatedUser = username;
          res.cookie("token",token)
          res.status(200).json({ sucess : true , body : {token}})
          
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
};

export default { registerUser, loginUser };
