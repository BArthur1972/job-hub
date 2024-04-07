const dbConnection = require("../config/dbConnection");
const Utils = require("./utils");
const Company = require("./Company");
const Application = require("./Application");

class JobListing {
  // Get all job listings
  static getAllJobListings() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM JobListing";
      dbConnection.query(query, (err, result) => {
        if (err) {
          console.log("Error getting all job listings: ", err);
          reject("Error getting all job listings");
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
          console.log("Error getting job listing by id: ", err);
          reject("Error getting job listing by id");
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
          console.log("Error getting job listings by company name: ", err);
          reject("Error getting job listings by company name");
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
          console.log("Error getting job listings by job title: ", err);
          reject("Error getting job listings by job title");
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
          console.log("Error getting job listings by location: ", err);
          reject("Error getting job listings by location");
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
          this.getJobListingById(jobListingId)
            .then((jobListing) => {
              resolve(jobListing[0]);
            })
            .catch((err) => {
              reject(err);
            });
        }
      });
    });
  }

  // Get job listings by recruiter id
  static getJobListingsByRecruiterId(recruiterId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM JobListing WHERE recruiterID = ${recruiterId}`;
      dbConnection.query(query, async (err, result) => {
        if (err) {
          console.log("Error getting job listings by recruiter id: ", err);
          reject("Error getting job listings by recruiter id");
        } else {
          // get company name for each job listing and add it to the JSON
          const jobListingsWithCompanyNames = await Promise.all(
            result.map(async (jobListing) => {
              const company = await Company.getCompanyById(
                jobListing.companyID
              );
              return { ...jobListing, companyName: company[0].companyName };
            })
          );

          // Get the number of applicants for each job listing and add it to the JSON
          const jobListingsWithApplicantCounts = await Promise.all(
            jobListingsWithCompanyNames.map(async (jobListing) => {
              const result = await Application.getNumberOfApplicants(
                jobListing.jobID
              );
              return { ...jobListing, applicants: result.count };
            })
          );

          // Format the postingDate and expirationDate for each job listing
          jobListingsWithApplicantCounts.forEach((jobListing) => {
            jobListing.postingDate = new Date(jobListing.postingDate)
              .toISOString()
              .slice(0, 10);
            jobListing.expirationDate = new Date(jobListing.expirationDate)
              .toISOString()
              .slice(0, 10);
          });

          resolve(jobListingsWithApplicantCounts);
        }
      });
    });
  }

  // Update job listing by id
  static updateJobListingById(jobListingId, jobListing) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE JobListing SET jobTitle = '${jobListing.jobTitle}', jobDescription = '${jobListing.jobDescription}', companyID = ${jobListing.companyID}, location = '${jobListing.location}', employmentType = '${jobListing.employmentType}', postingDate = '${jobListing.postingDate}', salary = '${jobListing.salary}', skillsRequired = "${jobListing.skillsRequired}", experienceRequired = "${jobListing.experienceRequired}", qualificationsRequired = "${jobListing.qualificationsRequired}", expirationDate = '${jobListing.expirationDate}', recruiterID = ${jobListing.recruiterID} WHERE jobID = ${jobListingId}`;
      dbConnection.query(query, (err, result) => {
        if (err) {
          console.log("Error updating job listing by id: ", err);
          reject({ error: "Error updating job listing by id" });
        } else {
          resolve({ message: "Job listing updated successfully" });
        }
      });
    });
  }

  // Delete job listing by id and all applications associated with it
  static deleteJobListingById(jobListingId, recruiterId) {
    // Get seekerIDs of all applicants associated with the job listing
    return new Promise((resolve, reject) => {
      const query = `SELECT seekerID FROM Application WHERE jobID = ${jobListingId}`;
      dbConnection.query(query, async (err, result) => {
        if (err) {
          console.log("Error getting applicant IDs: ", err);
          reject({ error: "Error getting applicant IDs" });
        } else {
          // Delete all applications associated with the job listing
          await Promise.all(
            result.map(async (application) => {
              return Application.deleteApplication(
                application.seekerID,
                jobListingId
              );
            })
          );

          // Delete the job listing
          dbConnection.query(
            `DELETE FROM JobListing WHERE jobID = ${jobListingId} AND recruiterID = ${recruiterId}`,
            (err, result) => {
              if (err) {
                console.log("Error deleting job listing: ", err);
                reject({ error: "Error deleting job listing" });
              } else {
                resolve({ message: "Job listing deleted successfully" });
              }
            }
          );
        }
      });
    });
  }
}

module.exports = JobListing;
