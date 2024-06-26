const dbConnection = require("../config/dbConnection");
const Utils = require("./utils");
const JobSeeker = require("./JobSeeker");

class Application {
	// Get all applications
	static getAllApplications() {
		return new Promise((resolve, reject) => {
			const query =
				"SELECT * FROM Application INNER JOIN JobListing ON Application.jobID = JobListing.jobID";
			dbConnection.query(query, (err, result) => {
				if (err) {
					console.log("Error getting all applications and job listings: ", err);
					reject("Error getting all applications and job listings");
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
		  const query = "SELECT * FROM Application INNER JOIN JobListing ON Application.jobID = JobListing.jobID WHERE Application.seekerID = ?";
		  console.log(query);
		  dbConnection.query(query, [jobSeekerId], (err, result) => {
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
					console.log(result);
					resolve("Application deleted successfully");
				}
			});
		});
	}

	// Get all applicants for all job listings by a recruiter
	static getApplicantsByRecruiterId(recruiterID) {
		return new Promise((resolve, reject) => {
			const query = `SELECT * FROM Application INNER JOIN JobListing ON Application.jobID = JobListing.jobID WHERE JobListing.recruiterID = '${recruiterID}'`;
			dbConnection.query(query, async (err, result) => {
				if (err) {
					console.log("Error getting all applications for recruiter: ", err);
					reject("Error getting all applications for recruiter");
				} else {
					// Get each applicant's id, name and email from the job seeker table add that to each application object
					const applicationsWithJobSeeker = await Promise.all(
						result.map(async (application) => {
							const jobSeeker = await JobSeeker.getJobSeekerById(application.seekerID);
							return { ...application, name: jobSeeker[0].firstName + " " + jobSeeker[0].lastName, email: jobSeeker[0].email, profilePicture: jobSeeker[0].profilePicture };
						})
					);
					// Resolve the promise with the processed applications
					resolve(applicationsWithJobSeeker);
				}
			});
		});
	}

	// Get number of applicants for a job listing
	static getNumberOfApplicants(jobID) {
		return new Promise((resolve, reject) => {
			const query = `SELECT COUNT(*) as count FROM Application WHERE jobID = '${jobID}'`;
			dbConnection.query(query, (err, result) => {
				if (err) {
					console.log("Error getting number of applicants: ", err);
					reject("Error getting number of applicants");
				} else {
					resolve(result[0]);
				}
			});
		});
	}

	// Get Number of applicants for a specific recruiter's job listings by recruiterID
	static getNumberOfApplicantsByRecruiterId(recruiterID) {
		return new Promise((resolve, reject) => {
			const query = `SELECT COUNT(*) as count FROM Application INNER JOIN JobListing ON Application.jobID = JobListing.jobID WHERE JobListing.recruiterID = ${recruiterID}`;
			dbConnection.query(query, (err, result) => {
				if (err) {
					console.log("Error getting number of applicants by recruiter id: ", err);
					reject("Error getting number of applicants by recruiter id");
				} else {
					console.log(result);
					resolve(result[0]);
				}
			});
		});
	}

	// Get applicant status counts for a recruiter's job listings
	static getApplicantStatusCounts(recruiterID) {
		return new Promise((resolve, reject) => {
			const query = `SELECT status FROM Application INNER JOIN JobListing ON Application.jobID = JobListing.jobID WHERE JobListing.recruiterID = ${recruiterID}`;
			dbConnection.query(query, (err, result) => {
				if (err) {
					console.log("Error getting applicant status counts by recruiter id: ", err);
					reject("Error getting applicant status counts by recruiter id");
				} else {
					const counts = {
						Applied: 0,
						Interviewing: 0,
						Hired: 0,
						Rejected: 0,
					};
					result.forEach((application) => {
						counts[application.status]++;
					});
					resolve(counts);
				}
			});
		});
	}

	// Get number of applications based on employment type for a recruiter's job listings
	static getEmploymentTypeCounts(recruiterID) {
		return new Promise((resolve, reject) => {
			const query = `SELECT  employmentType FROM JobListing INNER JOIN Application ON JobListing.jobID = Application.jobID WHERE JobListing.recruiterID = ${recruiterID}`;
			dbConnection.query(query, (err, result) => {
				if (err) {
					console.log("Error getting employment type counts by recruiter id: ", err);
					reject("Error getting employment type counts by recruiter id");
				} else {
					const counts = {
						"Full-Time": 0,
						"Part-Time": 0,
						Contract: 0,
						Internship: 0,
					};
					result.forEach((application) => {
						counts[application.employmentType]++;
					});
					resolve(counts);
				}
			});
		});
	}
}

module.exports = Application;
