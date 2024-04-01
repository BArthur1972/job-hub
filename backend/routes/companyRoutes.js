const router = require('express').Router();
const Company = require('../models/Company');

// Get all companies
router.get('/', async (req, res) => {
    try {
        const companies = await Company.getAllCompanies();
        res.status(200).send(companies);
        console.log(companies);
    } catch (err) {
        console.log('Error getting all companies: ', err);
        res.status(500).send('Error getting all companies');
    }
});


module.exports = router;