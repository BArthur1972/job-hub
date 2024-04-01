const dbConnection = require('../config/dbConnection');

class Recruiter {

    // Get all recruiters
    static getAllRecruiters() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Recruiter';
            dbConnection.query(query, (err, result) => {
                if (err) {
                    console.log('Error getting all recruiters: ', err);
                    reject('Error getting all recruiters');
                } else {
                    const recruitersWithoutPasswords = Recruiter.removePasswords(result);
                    const recruitersJSON = Recruiter.toJSON(recruitersWithoutPasswords);
                    resolve(recruitersJSON);
                }
            });
        });
    }

    static removePasswords(recruiters) {
        return recruiters.map(recruiter => {
            delete recruiter.password;
            return recruiter;
        });
    }

    static toJSON(recruiters) {
        return JSON.parse(JSON.stringify(recruiters));
    }
}

module.exports = Recruiter;