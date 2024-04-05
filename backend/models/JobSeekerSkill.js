const dbConnection = require("../config/dbConnection");
const Utils = require("./utils");

class JobSeekerSkill {
        // Insert job seeker skill into the database
        static insertSkill(seekerID, skill) {
            return new Promise((resolve, reject) => {
                const query = `INSERT INTO JobSeekerSkill (skill, seekerID) VALUES ('${skill}', ${seekerID})`;
                dbConnection.query(query, skill, (err, result) => {
                    if (err) {
                        console.log("Error inserting job seeker skill: ", err);
                        reject(err.sqlMessage);
                    } else {
                        console.log("Inserted job seeker skill: ", result);
                        resolve(result);
                    }
                });
            });
        }

        // Get all job seeker skills by seekerID
        static getSkills(seekerID) {
            return new Promise((resolve, reject) => {
                const query = `SELECT * FROM JobSeekerSkill WHERE seekerID = ${seekerID}`;
                dbConnection.query(query, (err, result) => {
                    if (err) {
                        console.log("Error getting job seeker skills: ", err);
                        reject(err.sqlMessage);
                    } else {
                        resolve(Utils.toJSON(result));
                    }
                });
            });
        }
}

module.exports = JobSeekerSkill;