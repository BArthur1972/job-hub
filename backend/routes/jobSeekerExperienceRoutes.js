const router = require('express').Router();
const JobSeekerExperience = require('../models/JobSeekerExperience');

// Add a job seeker experience
router.post('/insert', async (req, res) => {
    try {
        const { seekerID, experienceInfo } = req.body;
        await JobSeekerExperience.insertExperience(seekerID, experienceInfo);
        res.status(200).send({data: "Job seeker experience added successfully"});
    } catch (err) {
        console.log("Error adding job seeker experience: ", err);
        res.status(500).send({error: err});
    }
});

// Get all job seeker experience
router.get('/getAll/:seekerID', async (req, res) => {
    try {
        const { seekerID } = req.params;
        const experience = await JobSeekerExperience.getExperience(seekerID);
        res.status(200).send(experience);
    } catch (err) {
        console.log("Error getting job seeker experience: ", err);
        res.status(500).send({error: err});
    }
});

module.exports = router;