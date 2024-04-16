const router = require('express').Router();
const JobSeekerEducation = require('../models/JobSeekerEducation');

// Add a job seeker education
router.post('/insert', async (req, res) => {
    try {
        const { seekerID, educationInfo } = req.body;
        await JobSeekerEducation.insertEducation(seekerID, educationInfo);
        res.status(200).send({data: "Job seeker education added successfully"});
    } catch (err) {
        console.log("Error adding job seeker education: ", err);
        res.status(500).send({error: err});
    }
});

// Get all job seeker education
router.get('/getAll/:seekerID', async (req, res) => {
    try {
        const { seekerID } = req.params;
        const education = await JobSeekerEducation.getEducation(seekerID);
        res.status(200).send(education);
    } catch (err) {
        console.log("Error getting job seeker education: ", err);
        res.status(500).send({error: err});
    }
});

module.exports = router;
