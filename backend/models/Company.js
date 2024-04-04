const dbConnection = require('../config/dbConnection');
const Utils = require('./utils');

class Company {

    // Get all companies
    static getAllCompanies() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Company';
            dbConnection.query(query, (err, result) => {
                if (err) {
                    console.log('Error getting all companies: ', err);
                    reject('Error getting all companies');
                } else {
                    const companiesJSON = Company.toJSON(result);
                    resolve(companiesJSON);
                }
            });
        });
    }

    // Get company by name
    static getCompanyByName(companyName) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM Company WHERE companyName = '${companyName}'`;
            console.log(query);
            dbConnection.query(query, (err, result) => {
                if (err) {
                    console.log('Error getting company by name: ', err);
                    reject('Error getting company by name');
                } else {
                    const companyJSON = Utils.toJSON(result);
                    console.log(companyJSON);
                    resolve(companyJSON);
                }
            });
        });
    }
}

module.exports = Company;