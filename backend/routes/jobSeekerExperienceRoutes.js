const router = require('express').Router();
const JobSeekerExperience = require('../models/JobSeekerExperience');
const auth = require('../middleware/jobSeekerAuth');

// Add a job seeker experience
router.post('/insert', auth, async (req, res) => {
    try {
        const { seekerID, experienceInfo } = req.body;
        await JobSeekerExperience.insertExperience(seekerID, experienceInfo);
        res.status(200).send({data: "Job seeker experience added successfully"});
    } catch (err) {
        console.log("Error adding job seeker experience: ", err);
        res.status(500).send(err);
    }
});

module.exports = router;