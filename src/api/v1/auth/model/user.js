/* eslint class-methods-use-this: ["error", 
  { "exceptMethods": [
      "createUser",
      "checkNewUserInfo",
      "checkUserPasswordConfirmation",
      "encriptNewUserPassword",
      "getNewUserRole",
      "getUserByEmail",
      "comparePassword",
      "generaateAccessToken",
      "generaateRefreshToken",
      "updateUserById",
      "getUserByResetToken",
      "generateSalt"
    ]
  }
 ] */

import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import { db, authorization, errors } from '../../../../modules';

const saltRounds = 10

class User {
    /**
     * This function create and reurn the new user.
     * @param {Object} userInfo 
     * example of userInfo object: 
     * {
     *    "name": "Tester", // Required
     *    "email": "tester@example.com", // Required
     *    "phone": "+380667500687",
     *    "password": "test",
     *    "confirm": "test"
     * }
     * 
     * If you create the new user without password, it will create the guest user.
     * Example of the responce:
     * {
     *    "name": "Tester",
     *    "email": "tester@example.com",
     *    "_id": "594a2e371f752a5946f2ac86",
     *    "updated_date": "2017-06-21T08:28:23.590Z",
     *    "role": "guest",
     *    "created_date": "2017-06-21T08:28:23.590Z"
     *    "password": // Encripted password from the responce.
     * }
     */
    async createUser(userInfo) {
        const password = await this.encriptNewUserPassword(userInfo.password);

        const createdUser = await db.User.save({
            login: userInfo.login,
            password
        });

        return createdUser.toJSON();
    }

    /**
     * Check required fields in user object
     * @param {Object} user 
     * 
     * It checks the name and email fields on the user object.
     * If this fields will be empty, in throws 409 Error.
     */
    checkNewUserInfo(user) {
        let isValid = true;
        const errorList = [];

        if (typeof user.name !== 'string') {
            isValid = false;
            errorList.push('name');
        }

        if (typeof user.email !== 'string') {
            isValid = false;
            errorList.push('email');
        }

        if (!isValid) {
            const errorMessage = `${errorList.join(', ')} ${errorList.length > 1 ? 'are' : 'is'} requited field`;

            throw new errors.Invalidparameters(errorMessage);
        }
    }

    /**
     * Check user password confirmation
     * @param {String} password
     * @param {String} passwordConfirmation
     * It compare password and confirm fields.
     * If thes fiealds are not equal, it trows an 409 error.
     */
    checkUserPasswordConfirmation(password, passwordConfirmation) {
        if (password !== passwordConfirmation) {
            throw new errors.Invalidparameters(`Password confirmation doesn't match Password`);
        }
    }

    /**
     * This function used for encripting usr password
     * @param {String} toEncryptPassword
     * 
     */

    async encriptNewUserPassword(toEncryptPassword) {
        const salt = await this.generateSalt();
        // const password = await bcrypt.hash(toEncryptPassword, salt);
        // get the password
        return new Promise((resolve, reject) => {
            bcrypt.hash(toEncryptPassword, salt, null, (err, password) => {
                console.log('hach complete');
                if (err) {
                    reject(err);
                }
                resolve(password);
            });
        });
    }

    async generateSalt() {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(saltRounds, (err, salt) => {
                if (err) {
                    reject(err);
                }
                resolve(salt);
            });
        });
    }

    /**
     * Returns user role.
     * @param {Object} user 
     * If type of the user.password is equal to string, role will be customer.
     * If not, role will be gest. 
     */
    getNewUserRole(user) {
        let role = 'guest';

        if (typeof user.password === 'string') {
            // if user have password, we give hime role - customer
            role = 'customer';
        }

        return role;
    }

    /**
     * Find user by email
     * @param {String} email 
     * Return user if user exist.
     */
    async getUserByEmail(email) {
        return db.User.findOne({ email });
    }

    /**
     * Check is encrypted password is equal to the user`s password
     * @param {String} password 
     * @param {String} hash 
     * 
     * Returns true if equal and false if not.
     */
    comparePassword(userPassword, encryptedPasswordFromDb) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(userPassword, encryptedPasswordFromDb, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        })
    }

    /**
     * Generate access token, which be expired in 'expire' time;
     * @param {Object} user 
     * Returns access JWT token.
     */
    generaateAccessToken(user) {
        const secret = authorization.getJwtAuthorizationSecretKey();
        const expire = authorization.getExpireAuthorizationTime();
        const accessToken = jwt.sign(user, secret, { expiresIn: expire });

        return accessToken;
    }

    /**
     * Get user by reset tiken
     * @param {String} token 
     * This function used in reset password controller.
     */
    getUserByResetToken(token) {
        return db.User.findOne({ reset_token: token })
    }

    /**
     * Generate refresh token, which be expired in 'expire' time;
     * this token we need to regenerate access token without entering email and password.
     * @param {Object} user 
     * Returns access JWT token.
     */
    generaateRefreshToken(user) {
        const secret = authorization.getJwtRefreshSecretKey();
        const expire = authorization.getExpireRefreshTime();
        const refreshToken = jwt.sign(user, secret, { expiresIn: expire });

        return refreshToken;
    }

    /**
     * Update User by ID. Params - is an object to update
     * @param {String} userId 
     * @param {Object} params
     */
    updateUserById(userId, params) {
        return db.User.findByIdAndUpdate(userId, params);
    }
}

const user = new User;

export default user;