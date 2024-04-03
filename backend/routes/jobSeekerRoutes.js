const router = require('express').Router();
const JobSeeker = require('../models/JobSeeker');
const auth = require('../middleware/jobSeekerAuth');

// Get all job seekers
router.get('/', async (req, res) => {
    try {
        const jobSeekers = await JobSeeker.getAllJobSeekers();
        res.status(200).send(jobSeekers);
        console.log(jobSeekers);
    } catch (err) {
        console.log('Error getting all job seekers: ', err);
        res.status(500).send({error: 'Error getting all job seekers'});
    }
});

// Get job seeker by id
router.get('/:jobSeekerID', async (req, res) => {
    try {
        const { jobSeekerID } = req.params;
        const jobSeeker = await JobSeeker.getJobSeekerById(jobSeekerID);
        res.status(200).send(jobSeeker);
        console.log(jobSeeker);
    } catch (err) {
        console.log('Error getting job seeker: ', err);
        res.status(500).send({error: 'Error getting job seeker'});
    }
});

// Signup a new job seeker
router.post('/signup', async (req, res) => {
    try {
        const jobSeeker = await JobSeeker.signupJobSeeker(req.body);
        const jobSeekerWithToken = await JobSeeker.generateAuthTokenAndAddToJobSeeker(jobSeeker);
        console.log({user:jobSeekerWithToken, token:jobSeekerWithToken.token});
        res.status(200).send({user: jobSeekerWithToken, token: jobSeekerWithToken.token});
    } catch (err) {
        console.log("Error signing up job seeker: ", err);
        res.status(500).send(err);
    }
});

// Login a job seeker
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const jobSeeker = await JobSeeker.loginJobSeeker(email, password);
        const jobSeekerWithToken = await JobSeeker.generateAuthTokenAndAddToJobSeeker(jobSeeker);
        console.log({user:jobSeekerWithToken, token:jobSeekerWithToken.token});
        res.status(200).send({user: jobSeekerWithToken, token: jobSeekerWithToken.token});
    } catch (err) {
        console.log("Error logging in job seeker: ", err);
        res.status(500).send(err);
    }
});

// Logout a job seeker
router.post('/logout/', auth, async (req, res) => {
    try {
        const { seekerID } = req.body;
        await JobSeeker.logoutJobSeeker(seekerID);
        res.status(200).send({data: "Job seeker logged out successfully"});
    } catch (err) {
        console.log("Error logging out job seeker: ", err);
        res.status(500).send(err);
    }
});

// Update a job seeker
router.put('/update/', async (req, res) => {
    try {
        const { seekerID } = req.body;
        const updatedJobSeeker = await JobSeeker.updateJobSeeker(seekerID, req.body);
        res.status(200).send({user: updatedJobSeeker});
    } catch (err) {
        console.log("Error updating job seeker: ", err);
        res.status(500).send(err);
    }
});

module.exports = router;