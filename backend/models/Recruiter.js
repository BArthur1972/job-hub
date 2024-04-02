const dbConnection = require('../config/dbConnection');
const { isEmail } = require('validator');
const Utils = require('./utils');
const jwt = require('jsonwebtoken');

class Recruiter {
    // Get recruiter by id
    static getRecruiterById(recruiterId) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM Recruiter WHERE recruiterID = ${recruiterId}`;
            console.log(query);
            dbConnection.query(query, (err, result) => {
                if (err) {
                    reject(err.sqlMessage);
                } else {
                    // Remove password and return the recruiter
                    delete result[0].password;
                    const recruiterJSON = Utils.toJSON(result);
                    resolve(recruiterJSON);
                }
            });
        });
    }

    // Get all recruiters
    static getAllRecruiters() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Recruiter';
            dbConnection.query(query, (err, result) => {
                if (err) {
                    reject(err.sqlMessage);
                } else {
                    const recruitersWithoutPassword = Utils.removePasswords(result);
                    const recruitersJSON = Utils.toJSON(recruitersWithoutPassword);
                    resolve(recruitersJSON);
                }
            });
        });
    }

    static signupRecruiter(recruiter) {
        return new Promise((resolve, reject) => {
            if (!isEmail(recruiter.email)) {
                reject('Invalid email');
            } else {
                // Hash password
                Utils.hashPassword(recruiter.password)
                    .then((hashedPassword) => {
                        const query = `INSERT INTO Recruiter (firstName, lastName, email, password, contactNumber, bio, profilePicture, companyID) 
                                VALUES ('${recruiter.firstName}', '${recruiter.lastName}', '${recruiter.email}', '${hashedPassword}', '${recruiter.contactNumber}', '${recruiter.bio}', '${recruiter.profilePicture}', ${recruiter.companyID})`;
                        dbConnection.query(query, recruiter, (err, result) => {
                            if (err) {
                                console.log("Error inserting recruiter: ", err);
                                reject(err.sqlMessage);
                            } else {
                                // Get the newly created recruiter and return it
                                console.log(result);
                                const recruiterId = result.insertId;
                                this.getRecruiterById(recruiterId).then((recruiter) => {
                                    resolve(recruiter[0]);
                                }).catch((err) => {
                                    reject(err);
                                });
                            }
                        });
                    })
                    .catch((err) => {
                        console.log('Error hashing password: ', err);
                        reject(err);
                    });
            }
        });
    }

    // Login a recruiter
    static loginRecruiter(email, password) {
        return new Promise((resolve, reject) => {
            if (!isEmail(email)) {
                reject('Invalid email');
            }
            this.getUserByCredentials(email, password).then((recruiter) => {
                resolve(recruiter);
            }).catch((err) => {
                reject(err);
            });

        });
    }


    // Logout a recruiter. Remove the token for that recruiter from the database and return a success message.
    static logoutRecruiter(recruiterId) {
        return new Promise((resolve, reject) => {
            const query = `UPDATE Recruiter SET token = NULL WHERE recruiterID = ${recruiterId}`;
            dbConnection.query(query, (err, result) => {
                if (err) {
                    reject(err.sqlMessage);
                } else {
                    console.log(result.protocol41);
                    resolve('Recruiter logged out successfully');
                }
            });
        });
    }


    // Get a recruiter by email and password from the database and return the recruiter if found
    static getUserByCredentials = async function (email, password) {
        const query = `SELECT * FROM Recruiter WHERE email = '${email}'`;
        return new Promise((resolve, reject) => {
            dbConnection.query(query, async (err, result) => {
                if (err) {
                    reject(err.sqlMessage);
                } else {
                    if (result.length === 0) {
                        reject('No recruiter found with that email');
                    } else {
                        const recruiter = result[0];
                        const isMatch = await Utils.comparePassword(password, recruiter.password);
                        if (isMatch) {
                            delete recruiter.password;
                            resolve(Utils.toJSON(recruiter));
                        } else {
                            reject('Incorrect password');
                        }
                    }
                }
            });
        });
    }

    // Generate an auth token for a recruiter and add it to the database
    static generateAuthTokenAndAddToRecruiter(recruiter) {
        return new Promise((resolve, reject) => {
            console.log("Recruiter object in generateAuthTokenAndAddToRecruiter: ", recruiter);
            const token = jwt.sign({ id: recruiter.recruiterID }, process.env.JWT_SECRET);
            const query = `UPDATE Recruiter SET token = '${token}' WHERE recruiterID = ${recruiter.recruiterID}`;
            dbConnection.query(query, (err, result) => {
                if (err) {
                    reject(err.sqlMessage);
                } else {
                    console.log(token)
                    resolve(token);
                }
            });
        });
    }
}

module.exports = Recruiter;