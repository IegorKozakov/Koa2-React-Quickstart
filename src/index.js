import Koa from 'koa';
import IO from 'koa-socket';
import mount from 'koa-mount';
import cors from 'koa2-cors';

import api from './api';
import config from './config';
import middleware from './middlewares';
import db from './modules/db';

import createNewRoom from './socket';

const app = new Koa();
app.use(cors());

// global socket emitter
let global = createNewRoom('', app);

let chatRoom = createNewRoom('chat', app);



const dbConfig = {
  debug: config.db.develop,
  uri: config.db.connectionUrl
}

db.connect(dbConfig).init();

db.on('connected', () => {
  console.log(`connected to the db ${dbConfig.uri}`);
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      console.log("error", error);
      await middleware.errorHandler(error, ctx);
    }
  });

  app.use(middleware.staticReader);
  app.use(mount('/api', api));
});

db.on('disconnect', (error) => {
  console.log(`Connection with MongoDB was lost`);
  console.log(error);
});



app.listen(config.app.port);

export default app;
