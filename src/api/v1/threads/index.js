import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import _ from 'koa-route';
import db from '../../../modules/db';


const app = new Koa();

app.use(bodyParser());

app.use(_.get('/', async ctx => {
  ctx.status = 200

  const threads = await db.Thread.find();

  ctx.body = threads;
}));

app.use(_.post('/', async ctx => {
  console.log('body', ctx.request.body);
  db.Thread.save({
    name: ctx.request.body.name
  });
  ctx.status = 200;
}));

export default app;
