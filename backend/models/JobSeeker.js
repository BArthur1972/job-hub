const dbConnection = require("../config/dbConnection");
const { isEmail } = require("validator");
const Utils = require("./utils");
const jwt = require("jsonwebtoken");

class JobSeeker {
  // Get job seeker by id
  static getJobSeekerById(jobSeekerId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM JobSeeker WHERE seekerID = ${jobSeekerId}`;
      dbConnection.query(query, (err, result) => {
        if (err) {
          reject(err.sqlMessage);
        } else {
          // Remove password and return the job seeker
          if (result.length === 0) {
            reject("Job Seeker not found");
          }
          delete result[0].password;
          const jobSeekerJSON = Utils.toJSON(result);
          resolve(jobSeekerJSON);
        }
      });
    });
  }

  // Get all job seekers
  static getAllJobSeekers(req, res) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM JobSeeker";
      dbConnection.query(query, (err, result) => {
        if (err) {
          console.log("Error getting all job seekers: ", err);
          reject("Error getting all job seekers");
        } else {
          const jobSeekersWithoutPasswords = Utils.removePasswords(result);
          const jobSeekersJSON = Utils.toJSON(jobSeekersWithoutPasswords);
          resolve(jobSeekersJSON);
        }
      });
    });
  }

  // Signup a new job seeker
  static signupJobSeeker(jobSeeker) {
    return new Promise((resolve, reject) => {
      if (!isEmail(jobSeeker.email)) {
        reject("Invalid email");
      } else {
        // Hash password
        Utils.hashPassword(jobSeeker.password)
          .then((hashedPassword) => {
            const query = `INSERT INTO JobSeeker (firstName, lastName, email, password, contactNumber, bio, location, resume, profilePicture)
                                VALUES ('${jobSeeker.firstName}', '${jobSeeker.lastName}', '${jobSeeker.email}', '${hashedPassword}', '${jobSeeker.contactNumber}', '${jobSeeker.bio}', '${jobSeeker.location}', '${jobSeeker.resume}', '${jobSeeker.profilePicture}')`;
            dbConnection.query(query, jobSeeker, (err, result) => {
              if (err) {
                console.log("Error inserting job seeker: ", err);
                reject(err.sqlMessage);
              } else {
                // Get the newly created job seeker and return it
                console.log(result);
                const jobSeekerId = result.insertId;
                this.getJobSeekerById(jobSeekerId)
                  .then((jobSeeker) => {
                    resolve(jobSeeker[0]);
                  })
                  .catch((err) => {
                    reject(err);
                  });
              }
            });
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  }

  // Login a job seeker
  static loginJobSeeker(email, password) {
    return new Promise((resolve, reject) => {
      if (!isEmail(email)) {
        reject("Invalid email");
      }
      this.getUserByCredentials(email, password)
        .then((jobSeeker) => {
          resolve(jobSeeker);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // Logout a job seeker. Remove the token for that job seeker from the database and return a success message.
  static logoutJobSeeker(jobSeekerID) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE JobSeeker SET token = NULL WHERE seekerID = ${jobSeekerID}`;
      dbConnection.query(query, (err, result) => {
        if (err) {
          reject(err.sqlMessage);
        } else {
          resolve("Job Seeker logged out successfully");
        }
      });
    });
  }

  // Update job seeker depending on the fields in the body
  static updateJobSeeker(jobSeekerID, updatedFields) {
    return new Promise((resolve, reject) => {
      // Build the SQL query based on the fields in the updatedFields object
      const query = `UPDATE JobSeeker SET location = '${updatedFields.location}' WHERE seekerID = ${jobSeekerID}`;
      dbConnection.query(query, (err, result) => {
        if (err) {
          reject(err.sqlMessage);
        } else {
          console.log("Job Seeker updated successfully");
          // Find the job seeker by Id and return
          this.getJobSeekerById(jobSeekerID)
            .then((jobSeeker) => {
              resolve(jobSeeker[0]);
            })
            .catch((err) => {
              reject(err);
            });
        }
      });
    });
  }

  // Get job seeker by email and password
  // Get job seeker by email and password
  static async getUserByCredentials(email, password) {
    const query = `SELECT * FROM JobSeeker WHERE email = '${email}'`;
    return new Promise((resolve, reject) => {
      dbConnection.query(query, async (err, result) => {
        if (err) {
          reject(err.sqlMessage);
        } else {
          if (result.length === 0) {
            reject("User not found");
          } else {
            const jobSeeker = result[0];
            console.log("JobSeeker: ", jobSeeker);
            const isMatch = await Utils.comparePassword(
              password,
              jobSeeker.password
            );
            if (isMatch) {
              delete jobSeeker.password;
              resolve(Utils.toJSON(jobSeeker));
            } else {
              reject("Incorrect password");
            }
          }
        }
      });
    });
  }

  // Generate auth token and add to job seeker
  static generateAuthTokenAndAddToJobSeeker(jobSeeker) {
    return new Promise((resolve, reject) => {
      const token = jwt.sign(
        { id: jobSeeker.seekerID },
        process.env.JWT_SECRET
      );
      const query = `UPDATE JobSeeker SET token = '${token}' WHERE seekerID = ${jobSeeker.seekerID}`;
      dbConnection.query(query, (err, result) => {
        if (err) {
          reject(err.sqlMessage);
        } else {
          // Get the user again and return it
          this.getJobSeekerById(jobSeeker.seekerID)
            .then((jobSeeker) => {
              resolve(jobSeeker[0]);
            })
            .catch((err) => {
              reject(err);
            });
        }
      });
    });
  }
}

module.exports = JobSeeker;
