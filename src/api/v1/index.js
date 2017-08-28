import Koa from 'koa';
import mount from 'koa-mount';
import auth from './auth';
import threads from './threads';

const app = new Koa();

app.use(mount('/auth', auth));
app.use(mount('/threads', threads));

export default app;
