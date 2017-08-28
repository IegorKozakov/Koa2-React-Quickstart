import userModel from '../model/user';
import { errors, authorization } from '../../../../modules';

const checkUserRequiredParams = (user) => {
    console.log(user);
    if (
        typeof user.login !== 'string' ||
        typeof user.password !== 'string' ||
        typeof user.password_confirmation !== 'string'
    ) {
        throw new errors.Invalidparameters('login, password and password_confirmation are required fields');
    }

    if (user.password !== user.password_confirmation) {
        throw new errors.Invalidparameters(`Password confirmation doesn't match Password`);
    }
};

export default async (ctx) => {
    const body = ctx.request.body;

    checkUserRequiredParams(body);

    const user = await userModel.createUser({
        login: body.login,
        password: body.password,
    });

    const accessTocken = authorization.generaateAccessToken(user);
    const refreshTocken = authorization.generaateRefreshToken(user);

    user.authToken = accessTocken;
    user.refreshTocken = refreshTocken;

    ctx.body = user;
};