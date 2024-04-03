const router = require('express').Router();
const JobSeekerSkill = require('../models/JobSeekerSkill');
const auth = require('../middleware/jobSeekerAuth');

// Add a job seeker skill
router.post('/insert', auth, async (req, res) => {
    try {
        const { seekerID, skill } = req.body;
        await JobSeekerSkill.insertSkill(seekerID, skill);
        res.status(200).send({data: "Job seeker skill added successfully"});
    } catch (err) {
        console.log("Error adding job seeker skill: ", err);
        res.status(500).send(err);
    }
});

module.exports = router;