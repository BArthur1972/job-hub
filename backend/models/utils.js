const db = require('../config/dbConnection');
const bcrypt = require('bcrypt');

// This will store the utility functions that will be used in the models
class Utils {
    // Hash password before saving to database
    static hashPassword(password) {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    console.log('Error generating salt: ', err);
                    reject(err);
                } else {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) {
                            console.log('Error hashing password: ', err);
                            reject(err);
                        } else {
                            resolve(hash);
                        }
                    });
                }
            });
        });
    }

    // Compare password with hashed password
    static async comparePassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }

    static removePasswords(users) {
        return users.map(user => {
            delete user.password;
            return user;
        });
    }

    static toJSON(response) {
        return JSON.parse(JSON.stringify(response));
    }
}

module.exports = Utils;
