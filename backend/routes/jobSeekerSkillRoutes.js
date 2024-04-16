const router = require('express').Router();
const JobSeekerSkill = require('../models/JobSeekerSkill');

// Add a job seeker skill
router.post('/insert', async (req, res) => {
    try {
        const { seekerID, skill } = req.body;
        await JobSeekerSkill.insertSkill(seekerID, skill);
        res.status(200).send({data: "Job seeker skill added successfully"});
    } catch (err) {
        console.log("Error adding job seeker skill: ", err);
        res.status(500).send({error: err});
    }
});

// Get all job seeker skills by seekerID
router.get('/getAll/:seekerID', async (req, res) => {
    try {
        const seekerID = req.params.seekerID;
        const skills = await JobSeekerSkill.getSkills(seekerID);
        res.status(200).send(skills);
    } catch (err) {
        console.log("Error getting job seeker skills: ", err);
        res.status(500).send({error: err});
    }
});

module.exports = router;