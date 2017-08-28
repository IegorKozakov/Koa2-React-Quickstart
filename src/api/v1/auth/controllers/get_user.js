import _ from 'koa-route';

import userModel from '../model/user';

const getUser = async (ctx) => {
    const userFromState = ctx.state.user;
    const user = userModel.clearUserData(userFromState);

    ctx.body = user;
};

export default getUser;