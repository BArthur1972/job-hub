const jwt = require('jsonwebtoken');
const JobSeeker = require('../models/JobSeeker');

// Middleware to authenticate a job seeker
const jobSeekerAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const jobSeeker = await JobSeeker.getJobSeekerById(decoded.id);

        if (!jobSeeker) {
            throw new Error();
        }

        req.jobSeeker = jobSeeker;
        next();
    } catch (err) {
        res.status(401).send({ error: 'Please authenticate' });
    }
}

module.exports = jobSeekerAuth;