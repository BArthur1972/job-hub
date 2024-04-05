const dbConnection = require('../config/dbConnection');
const Utils = require('./utils');


class JobListing {
    // Get all job listings
    static getAllJobListings() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM JobListing';
            dbConnection.query(query, (err, result) => {
                if (err) {
                    console.log('Error getting all job listings: ', err);
                    reject('Error getting all job listings');
                } else {
                    const jobListingsJSON = Utils.toJSON(result);
                    resolve(jobListingsJSON);
                }
            });
        });
    }

    // Get job listing by id
    static getJobListingById(jobListingId) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM JobListing WHERE jobID = ${jobListingId}`;
            dbConnection.query(query, (err, result) => {
                if (err) {
                    console.log('Error getting job listing by id: ', err);
                    reject('Error getting job listing by id');
                } else {
                    const jobListingJSON = Utils.toJSON(result);
                    resolve(jobListingJSON);
                }
            });
        });
    }

    // Get job listings by company name
    static getJobListingsByCompanyName(companyName) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM JobListing WHERE companyName = '${companyName}'`;
            dbConnection.query(query, (err, result) => {
                if (err) {
                    console.log('Error getting job listings by company name: ', err);
                    reject('Error getting job listings by company name');
                } else {
                    const jobListingsJSON = Utils.toJSON(result);
                    resolve(jobListingsJSON);
                }
            });
        });
    }

    // Get job listings by job title
    static getJobListingsByJobTitle(jobTitle) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM JobListing WHERE jobTitle = '${jobTitle}'`;
            dbConnection.query(query, (err, result) => {
                if (err) {
                    console.log('Error getting job listings by job title: ', err);
                    reject('Error getting job listings by job title');
                } else {
                    const jobListingsJSON = Utils.toJSON(result);
                    resolve(jobListingsJSON);
                }
            });
        });
    }

    // Get job listings by location
    static getJobListingsByLocation(location) { 
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM JobListing WHERE location = '${location}'`;
            dbConnection.query(query, (err, result) => {
                if (err) {
                    console.log('Error getting job listings by location: ', err);
                    reject('Error getting job listings by location');
                } else {
                    const jobListingsJSON = Utils.toJSON(result);
                    resolve(jobListingsJSON);
                }
            });
        });
    }


   static createJobListing(jobListing) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO JobListing (jobID, jobTitle, jobDescription, companyID, location, employmentType, postingDate, salary, skillsRequired, experienceRequired, qualificationsRequired, expirationDate, recruiterID)
                            VALUES ('${jobListing.jobID}', '${jobListing.jobTitle}', '${jobListing.jobDescription}', ${jobListing.companyID}, '${jobListing.location}', '${jobListing.employmentType}', '${jobListing.postingDate}', '${jobListing.salary}', '${jobListing.skillsRequired}', '${jobListing.experienceRequired}', '${jobListing.qualificationsRequired}', '${jobListing.expirationDate}', ${jobListing.recruiterID})`;
            dbConnection.query(query, jobListing, (err, result) => {
                if (err) {
                    console.log("Error inserting job listing: ", err);
                    reject(err.sqlMessage);
                } else {
                    // Get the newly created job listing and return it
                    const jobListingId = result.insertId;
                    this.getJobListingById(jobListingId).then((jobListing) => {
                        resolve(jobListing[0]);
                    }).catch((err) => {
                        reject(err);
                    });
                }
            });
        });
    }
   
}

module.exports = JobListing;