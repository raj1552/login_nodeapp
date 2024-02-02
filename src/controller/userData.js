import pool from '../../db/config.js'

const userData = async (req, res) =>{
  try {
    const { rows } = await pool.query('SELECT * FROM exercise WHERE username = $1;', [req.user])
    res.json(rows)
  } catch (error) {
    console.error("Error:", error)
  }
}

export default { userData }
