const router = require('express').Router();
const Recruiter = require('../models/Recruiter');

// Get all recruiters
router.get('/', async (req, res) => {
    try {
        const recruiters = await Recruiter.getAllRecruiters();
        res.status(200).send(recruiters);
        console.log(recruiters);
    } catch (err) {
        console.log('Error getting all recruiters: ', err);
        res.status(500).send('Error getting all recruiters');
    }
});


module.exports = router;