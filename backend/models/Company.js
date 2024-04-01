const dbConnection = require('../config/dbConnection');

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

    static toJSON(companies) {
        return JSON.parse(JSON.stringify(companies));
    }
}

module.exports = Company;