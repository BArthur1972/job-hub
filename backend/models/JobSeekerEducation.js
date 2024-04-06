const dbConnection = require("../config/dbConnection");
const Utils = require("./utils");

class JobSeekerEducation {
        // Insert job seeker education into the database
        static insertEducation(seekerID, education) {
            return new Promise((resolve, reject) => {
                const query = `INSERT INTO JobSeekerEducation (institution, degree, discipline, startYear, endYear, seekerID)
                                    VALUES ("${education.school}", "${education.degree}", '${education.discipline}', ${education.startYear}, ${education.endYear}, ${seekerID})`;
                dbConnection.query(query, education, (err, result) => {
                    if (err) {
                        console.log("Error inserting job seeker education: ", err);
                        reject(err.sqlMessage);
                    } else {
                        console.log("Inserted job seeker education: ", result);
                        resolve(result);
                    }
                });
            });
        }

        // Get all job seeker education from the database
        static getEducation(seekerID) {
            return new Promise((resolve, reject) => {
                const query = `SELECT * FROM JobSeekerEducation WHERE seekerID = ${seekerID}`;
                dbConnection.query(query, (err, result) => {
                    if (err) {
                        console.log("Error getting job seeker education: ", err);
                        reject(err.sqlMessage);
                    } else {
                        resolve(Utils.toJSON(result));
                    }
                });
            });
        }
}

module.exports = JobSeekerEducation;