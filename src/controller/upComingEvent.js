import pool from "../../db/config.js";

const upComingEvents = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT description, duration, date FROM exercise WHERE username = $1 AND date BETWEEN DATE(NOW()) AND (DATE(NOW() + INTERVAL'6days')) LIMIT 6;",
      [req.user]
      );
      
      res.json(rows);
    } catch (error) {
      console.error(error);
    }
  };

export default { upComingEvents };
