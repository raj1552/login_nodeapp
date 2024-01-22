import pool from "../../db/config.js";

const exerciseRecord = async (req, res) => {
  try {
    let { description, duration, date } = req.body;

    if (!description || !duration) {
      return res
        .status(422)
        .json({ error: "Description & Duration is required!" });
    }
    if (!date) {
      date = new Date();
    }

    const { rows } = await pool.query(
      "SELECT calories_burn FROM exercise_type WHERE description = $1;",
      [description]
    );

    if (!rows) {
      return res.status(422).json({ error: "Invalid exercise type!" });
    }

    const calories_burn_per_minute = rows;
    const calories = duration * calories_burn_per_minute;

    await pool.query(
      "INSERT INTO exercise (username, description, duration, date) VALUES($1 , $2 , $3 , $4);",
      [req.user, description, duration, date]
    );
    res.json({ success: true, body: { rows }, calories });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Something went wrong!" });
  }
};

export default { exerciseRecord };
