import Koa from 'koa';
import mount from 'koa-mount';

import v1 from './v1';

const app = new Koa();

app.use(mount('/v1', v1));

export default app;
