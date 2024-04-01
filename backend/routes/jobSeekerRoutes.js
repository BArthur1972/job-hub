const router = require('express').Router();
const JobSeeker = require('../models/JobSeeker');

// Get all job seekers
router.get('/', async (req, res) => {
    try {
        const jobSeekers = await JobSeeker.getAllJobSeekers();
        res.status(200).send(jobSeekers);
        console.log(jobSeekers);
    } catch (err) {
        console.log('Error getting all job seekers: ', err);
        res.status(500).send('Error getting all job seekers');
    }
});


module.exports = router;