import pool from "../../db/config.js";

const getCaloriesBurned = async (req, res) => {
    try {
        const { rows } = await pool.query(
            `SELECT COALESCE(SUM(et.calories_burn * e.duration), 0) AS total_calories_burned 
            FROM exercise e JOIN exercise_type et ON e.description = et.description WHERE e.username = $1 
            AND e.date BETWEEN (DATE(NOW() - INTERVAL '7 days')) AND DATE(NOW());`,
            [req.user]
            );
            
            res.json({ success: true, rows });
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: "Something went wrong!" });
        }
    };

const totalWorkouts = async (req, res) => {
    try {
        const { rows } = await pool.query(
            `SELECT count(description) from exercise where username = $1 and date between
            (DATE(NOW() - INTERVAL '7 days')) AND DATE(NOW());`,
            [req.user]
            );
            res.json({ success: true, rows });
        } catch (error) {
            console.log(error);
        }
    };

export default { getCaloriesBurned, totalWorkouts };
