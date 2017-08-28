import userModel from '../model/user';
import { errors, authorization } from '../../../../modules';

const checkUserRequiredParams = (user) => {
    if (typeof user.email !== 'string' || typeof user.password !== 'string') {
        throw new errors.Invalidparameters('email and password are required fields');
    }
};

const register = async (ctx) => {
    const body = ctx.request.body;

    checkUserRequiredParams(body);

    const user = await userModel.getUser({
        email: body.email,
        password: body.password
    });

    const accessTocken = authorization.generaateAccessToken(user);
    const refreshTocken = authorization.generaateRefreshToken(user);

    user.authToken = accessTocken;
    user.refreshTocken = refreshTocken;

    ctx.body = user;
};

export default register;