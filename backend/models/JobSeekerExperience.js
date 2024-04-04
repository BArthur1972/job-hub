const dbConnection = require("../config/dbConnection");

class JobSeekerExperience {
        // Insert job seeker experience into the database
        static insertExperience(seekerID, experience) {
            return new Promise((resolve, reject) => {
                const query = `INSERT INTO JobSeekerExperience (company, role, startDate, endDate, seekerID) 
                                VALUES ('${experience.company}', '${experience.role}', '${experience.startDate}', '${experience.endDate}', ${seekerID})`;
                dbConnection.query(query, experience, (err, result) => {
                    if (err) {
                        console.log("Error inserting job seeker experience: ", err);
                        reject(err.sqlMessage);
                    } else {
                        console.log("Inserted job seeker experience: ", result);
                        resolve(result);
                    }
                });
            });
        }
}

module.exports = JobSeekerExperience;