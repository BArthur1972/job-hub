const dbConnection = require('../config/dbConnection');

class JobSeeker {

    // Get all job seekers
    static getAllJobSeekers(req, res) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM JobSeeker';
            dbConnection.query(query, (err, result) => {
                if (err) {
                    console.log('Error getting all job seekers: ', err);
                    reject('Error getting all job seekers');
                } else {
                    const jobSeekersWithoutPasswords = JobSeeker.removePasswords(result);
                    const jobSeekersJSON = JobSeeker.toJSON(jobSeekersWithoutPasswords);
                    resolve(jobSeekersJSON);
                }
            });
        });
    }

    static removePasswords(jobSeekers) {
        return jobSeekers.map(jobSeeker => {
            delete jobSeeker.password;
            return jobSeeker;
        });
    }

    static toJSON(jobSeekers) {
        return JSON.parse(JSON.stringify(jobSeekers));
    }
}

module.exports = JobSeeker;