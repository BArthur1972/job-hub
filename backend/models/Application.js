const dbConnection = require("../config/dbConnection");
const Utils = require("./utils");

class Application {
  // Get all applications
  static getAllApplications() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM Application";
      dbConnection.query(query, (err, result) => {
        if (err) {
          console.log("Error getting all applications: ", err);
          reject("Error getting all applications");
        } else {
          const applicationsJSON = Utils.toJSON(result);
          resolve(applicationsJSON);
        }
      });
    });
  }

  // Get application by id
  static getApplicationById(seekerID, jobID) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM Application WHERE seekerID = '${seekerID}' AND jobID = '${jobID}'`;
      dbConnection.query(query, (err, result) => {
        if (err) {
          console.log("Error getting application by id: ", err);
          reject("Error getting application by id");
        } else {
          const applicationJSON = Utils.toJSON(result);
          resolve(applicationJSON);
        }
      });
    });
  }

  // Get applications by job seeker id
  static getApplicationsByJobSeekerId(jobSeekerId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM Application WHERE seekerID = '${Number(
        jobSeekerId
      )}'`;
      console.log(query);
      dbConnection.query(query, (err, result) => {
        if (err) {
          console.log("Error getting applications by job seeker id: ", err);
          reject("Error getting applications by job seeker id");
        } else {
          const applicationsJSON = Utils.toJSON(result);
          console.log(applicationsJSON);
          resolve(applicationsJSON);
        }
      });
    });
  }

  // Get applications by job listing id
  static getApplicationsByJobListingId(jobListingId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM Application WHERE jobID = '${Number(
        jobListingId
      )}'`;
      console.log(query);
      dbConnection.query(query, (err, result) => {
        if (err) {
          console.log("Error getting applications by job listing id: ", err);
          reject("Error getting applications by job listing id");
        } else {
          const applicationsJSON = Utils.toJSON(result);
          console.log((app = applicationsJSON));
          resolve(applicationsJSON);
        }
      });
    });
  }

  // Get applications by status
  static getApplicationsByStatus(status) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM Application WHERE status = '${status}'`;
      console.log(query);
      dbConnection.query(query, (err, result) => {
        if (err) {
          console.log("Error getting applications by status: ", err);
          reject("Error getting applications by status");
        } else {
          const applicationsJSON = Utils.toJSON(result);
          console.log(applicationsJSON);
          resolve(applicationsJSON);
        }
      });
    });
  }

  static createApplication(application) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO Application (seekerID, jobID, status, dateApplied) VALUES ('${application.seekerID}', '${application.jobID}', '${application.status}', '${application.dateApplied}')`;
      dbConnection.query(query, application, (err, result) => {
        if (err) {
          console.log("Error inserting application: ", err);
          reject(err.sqlMessage);
        } else {
          // Get the newly created application and return it
          console.log(result);
          this.getApplicationById(application.seekerID, application.jobID)
            .then((application) => {
              resolve(application[0]);
            })
            .catch((err) => {
              reject(err);
            });
        }
      });
    });
  }

  // Update an application
  static updateApplicationStatus(seekerID, jobID, status) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE Application SET status = '${status}' WHERE seekerID = '${seekerID}' AND jobID = '${jobID}'`;
      dbConnection.query(query, (err, result) => {
        if (err) {
          console.log("Error updating application: ", err);
          reject(err.sqlMessage);
        } else {
          // Get the updated application and return it
          this.getApplicationById(seekerID, jobID)
            .then((application) => {
              resolve(application[0]);
            })
            .catch((err) => {
              reject(err);
            });
        }
      });
    });
  }

  // Delete an application
  static deleteApplication(seekerID, jobID) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM Application WHERE  seekerID = '${seekerID}' AND jobID = '${jobID}'`;
      dbConnection.query(query, (err, result) => {
        if (err) {
          console.log("Error deleting application: ", err);
          reject(err.sqlMessage);
        } else {
          resolve("Application deleted successfully");
        }
      });
    });
  }
}

module.exports = Application;
