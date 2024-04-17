const router = require("express").Router();
const Application = require("../models/Application");
const recruiterAuth = require("../middleware/recruiterAuth");

// Get all applications
router.get("/", async (req, res) => {
	try {
		const applications = await Application.getAllApplications();
		res.status(200).send(applications);
		console.log(applications);
	} catch (err) {
		console.log("Error getting all applications: ", err);
		res.status(500).send({ error: err });
	}
});

// Get applications by job seeker id
router.get("/seeker/:seekerID", async (req, res) => {
	try {
		const { seekerID } = req.params;
		const applications = await Application.getApplicationsByJobSeekerId(
			seekerID
		);
		res.status(200).send(applications);
		console.log(applications);
	} catch (err) {
		console.log("Error getting applications by job seeker id: ", err);
		res.status(500).send({ error: err });
	}
});

// get applications by job listing id
router.get("/listing/:jobID", async (req, res) => {
	try {
		const { jobID } = req.params;
		const applications = await Application.getApplicationsByJobListingId(jobID);
		res.status(200).send(applications);
		console.log(applications);
	} catch (err) {
		console.log("Error getting applications by job listing id: ", err);
		res.status(500).send({ error: err });
	}
});

// get by status
router.get("/:status", async (req, res) => {
	try {
		const { status } = req.params;
		const applications = await Application.getApplicationsByStatus(status);
		res.status(200).send(applications);
		console.log(applications);
	} catch (err) {
		console.log("Error getting applications by status: ", err);
		res.status(500).send({ error: err });
	}
});

// Create a new application
router.post("/create", async (req, res) => {
	try {
		const application = await Application.createApplication(req.body);
		res.status(200).send(application);
		console.log(application);
	} catch (err) {
		console.log("Error creating application: ", err);
		res.status(500).send({ error: err });
	}
});

// Update an application
router.put("/update", async (req, res) => {
	try {
		const { seekerID, jobID, status } = req.body;
		const application = await Application.updateApplicationStatus(
			seekerID,
			jobID,
			status
		);
		res.status(200).send(application);
		console.log(application);
	} catch (err) {
		console.log("Error updating application: ", err);
		res.status(500).send({ error: err });
	}
});

// Delete an application
router.delete("/delete", async (req, res) => {
	try {
		const { seekerID, jobID } = req.body;
		await Application.deleteApplication(seekerID, jobID);
		res.status(200).send({message: "Application deleted successfully"});
		console.log("Application deleted successfully");
	} catch (err) {
		console.log("Error deleting application: ", err);
		res.status(500).send({ error: err });
	}
});

// Get applicants for job listings by a recruiter id
router.get("/applicants/:recruiterID", async (req, res) => {
	try {
		const { recruiterID } = req.params;
		const applicants = await Application.getApplicantsByRecruiterId(recruiterID);
		res.status(200).send(applicants);
		console.log(applicants);
	} catch (err) {
		console.log("Error getting applications by recruiter id: ", err);
		res.status(500).send({ error: err });
	}
});

// Get number of applicants for a recruiter's job listings
router.get("/count/:recruiterID", async (req, res) => {
	try {
		const { recruiterID } = req.params;
		const count = await Application.getNumberOfApplicantsByRecruiterId(recruiterID);
		res.status(200).send(count);
		console.log(count);
	} catch (err) {
		console.log("Error getting number of applicants by recruiter id: ", err);
		res.status(500).send({ error: err });
	}
});

module.exports = router;
