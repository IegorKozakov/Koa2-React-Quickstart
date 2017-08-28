import jwt from 'jsonwebtoken';

class Authorization {
    constructor() {
        this._authorizationSecretKey = process.env.SECRET_AUTH_KEY;
        this._refreshSecretKey = process.env.SECRET_REFRESH_KEY;
        this._expireAuthorizationTime = process.env.TOKEN_AUTH_EXPIRE;
        this._expireRefreshTime = process.env.TOKEN_REFRESH_EXPIRE;

        if (
            typeof this._authorizationSecretKey !== 'string' ||
            typeof this._refreshSecretKey !== 'string' ||
            typeof this._expireAuthorizationTime !== 'string' ||
            typeof this._expireRefreshTime !== 'string'
        ) {
            throw new Error(`SECRET_AUTH_KEY, SECRET_REFRESH_KEY, TOKEN_AUTH_EXPIRE and TOKEN_REFRESH_EXPIRE are required!`);
        }
    }

    generaateAccessToken(user) {
        const accessToken = jwt.sign(user, this._authorizationSecretKey, { expiresIn: this._expireAuthorizationTime });
        return accessToken;
    }

    generaateRefreshToken(user) {
        const refreshToken = jwt.sign(user, this._refreshSecretKey, { expiresIn: this._expireRefreshTime });
        return refreshToken;
    }

    decodeAccessToken(token) {
        let user = null;

        try {
            user = jwt.verify(token, this._authorizationSecretKey);
        } catch (error) {
            user = false;
        }

        return user;
    }

    decodeRefreshToken(token) {
        let user = null;

        try {
            user = jwt.verify(token, this._refreshSecretKey);
        } catch (error) {
            user = false;
        }

        return user;
    }
}

const authorization = new Authorization;

export default authorization;