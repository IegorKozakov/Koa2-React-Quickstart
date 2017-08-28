import Koa from 'koa';
import _ from 'koa-route';
import bodyParser from 'koa-bodyparser';

import controllers from './controllers';

const app = new Koa();

app.use(bodyParser());

app.use(_.post('/register', controllers.register));

export default app;