const router = require('express').Router();
const Recruiter = require('../models/Recruiter');
const auth = require('../middleware/recruiterAuth');

// Get all recruiters
router.get('/', async (req, res) => {
    try {
        const recruiters = await Recruiter.getAllRecruiters();
        res.status(200).send(recruiters);
        console.log(recruiters);
    } catch (err) {
        console.log('Error getting all recruiters: ', err);
        res.status(500).send({error: 'Error getting all recruiters'});
    }
});

// Get recruiter by id
router.get('/:recruiterID', async (req, res) => {
    try {
        const { recruiterID } = req.params;
        const recruiter = await Recruiter.getRecruiterById(recruiterID);
        res.status(200).send(recruiter);
        console.log(recruiter);
    } catch (err) {
        console.log('Error getting recruiter: ', err);
        res.status(500).send({error: 'Error getting recruiter'});
    }
});

// Signup a new recruiter
router.post('/signup', async (req, res) => {
    try {
        const recruiter = await Recruiter.signupRecruiter(req.body);
        const recruiterWithToken = await Recruiter.generateAuthTokenAndAddToRecruiter(recruiter);
        console.log({user:recruiterWithToken, token:recruiterWithToken.token});
        res.status(200).send({user: recruiterWithToken, token: recruiterWithToken.token});
    } catch (err) {
        console.log("Error signing up recruiter: ", err);
        res.status(500).send(err);
    }
});

// Login a recruiter
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const recruiter = await Recruiter.loginRecruiter(email, password);
        const recruiterWithToken = await Recruiter.generateAuthTokenAndAddToRecruiter(recruiter);
        console.log({user:recruiterWithToken, token:recruiterWithToken.token});
        res.status(200).send({user: recruiterWithToken, token: recruiterWithToken.token});
    } catch (err) {
        console.log("Error logging in recruiter: ", err);
        res.status(500).send(err);
    }
});

// Logout a recruiter
router.post('/logout/', auth, async (req, res) => {
    try {
        const { recruiterID } = req.body;
        await Recruiter.logoutRecruiter(recruiterID);
        res.status(200).send({data: "Recruiter logged out successfully"});
    } catch (err) {
        console.log("Error logging out recruiter: ", err);
        res.status(500).send(err);
    }
});


module.exports = router;