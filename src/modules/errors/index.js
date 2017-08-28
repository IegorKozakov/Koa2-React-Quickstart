class UserIsAlreadyExist extends Error {
    constructor(message) {
        super(message);

        this._statusCode = 409;
    }
}

class AuthorizationError extends Error {
    constructor(message) {
        super(message);

        this._statusCode = 401;
    }
}

class Invalidparameters extends Error {
    constructor(message) {
        super(message);

        this._statusCode = 422;
    }
}

class AccessDenied extends Error {
    constructor(message) {
        super(message);

        this._statusCode = 403;
    }
}

class ServiceIsUnavailable extends Error {
    constructor(nessage) {
        super(nessage);

        this._statusCode = 500

    }
}

class ServerSideError extends Error {
    constructor(message) {
        super(message);

        this._statusCode = 500;
    }
}

export default {
    UserIsAlreadyExist,
    Invalidparameters,
    AccessDenied,
    ServiceIsUnavailable,
    ServerSideError,
    AuthorizationError
};