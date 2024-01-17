import pool from "../../db/config.js";


// exercise type should be a selector
// Each exercise type should have a calorie count associated with it
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
    await pool.query(
      "INSERT INTO exercise (username, description, duration, date) VALUES($1 , $2 , $3 , $4);",
      [req.user, description, duration, date]
    );
    res.json({ success: true, body: {} });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Something went wrong!" });
  }
};

export default { exerciseRecord };
