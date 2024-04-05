const router = require("express").Router();
const JobListing = require("../models/JobListing");

// Get all job listings
router.get("/", async (req, res) => {
  try {
    const jobListings = await JobListing.getAllJobListings();
    res.status(200).send(jobListings);
  } catch (err) {
    console.log("Error getting all job listings: ", err);
    res.status(500).send("Error getting all job listings");
  }
});

// Get job listing by id
router.get("/:jobID", async (req, res) => {
  try {
    const jobListing = await JobListing.getJobListingById(req.params.jobID);
    res.status(200).send(jobListing);
  } catch (err) {
    console.log("Error getting job listing by id: ", err);
    res.status(500).send("Error getting job listing by id");
  }
});

// Get job listings by company name
router.get("/company/:companyName", async (req, res) => {
  try {
    const jobListings = await JobListing.getJobListingsByCompanyName(
      req.params.companyName
    );
    res.status(200).send(jobListings);
  } catch (err) {
    console.log("Error getting job listings by company name: ", err);
    res.status(500).send("Error getting job listings by company name");
  }
});

// Get job listings by job title
router.get("/title/:jobTitle", async (req, res) => {
  try {
    const jobListings = await JobListing.getJobListingsByJobTitle(
      req.params.jobTitle
    );
    res.status(200).send(jobListings);
  } catch (err) {
    console.log("Error getting job listings by job title: ", err);
    res.status(500).send("Error getting job listings by job title");
  }
});

// Get job listings by location
router.get("/location/:location", async (req, res) => {
  try {
    const jobListings = await JobListing.getJobListingsByLocation(
      req.params.location
    );
    res.status(200).send(jobListings);
  } catch (err) {
    console.log("Error getting job listings by location: ", err);
    res.status(500).send("Error getting job listings by location");
  }
});


// Create a new job listing
router.post("/create", async (req, res) => {
  try {
    const jobListing = await JobListing.createJobListing(req.body);
    res.status(200).send(jobListing);
  } catch (err) {
    console.log("Error creating job listing: ", err);
    res.status(500).send("Error creating job listing");
  }
});


// Export the router

module.exports = router;
