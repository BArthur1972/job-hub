const jwt = require('jsonwebtoken');
const Recruiter = require('../models/Recruiter');

// Middleware to authenticate a recruiter
const recruiterAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const recruiter = await Recruiter.getRecruiterById(decoded.id);

        if (!recruiter) {
            throw new Error();
        }

        req.recruiter = recruiter;
        next();
    } catch (err) {
        res.status(401).send({ error: 'Please authenticate' });
    }
}

module.exports = recruiterAuth;