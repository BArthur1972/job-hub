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


// Get company by name
router.get('/company-name/:companyName', async (req, res) => {
    try {
      const company = await Company.getCompanyByName(req.params.companyName);
      res.status(200).send(company);
      console.log(company);
    } catch (err) {
      console.log('Error getting company by name: ', err);
      res.status(500).send('Error getting company by name');
    }
  });
  
  // Get company by id
  router.get('/company-id/:companyID', async (req, res) => {
    try {
      const company = await Company.getCompanyById(req.params.companyID);
      res.status(200).send(company);
      console.log(company);
    } catch (err) {
      console.log('Error getting company by id: ', err);
      res.status(500).send('Error getting company by id');
    }
  });


module.exports = router;