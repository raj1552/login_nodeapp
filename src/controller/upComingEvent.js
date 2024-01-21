import pool from "../../db/config.js";

const upComingEvents = async (req, res) => {
  try {
    let currentDate = new Date();
    let endDate = new Date();
    endDate.setDate(currentDate.getDate() + 4);
    const { rows } = await pool.query(
      "SELECT description, duration, date FROM exercise WHERE username = $1 AND date BETWEEN $2 AND $3 ORDER BY date LIMIT 6;",
      [req.user, currentDate, endDate]
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
  }
};

export default { upComingEvents };
