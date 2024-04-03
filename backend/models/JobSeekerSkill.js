const dbConnection = require("../config/dbConnection");

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
}

module.exports = JobSeekerSkill;