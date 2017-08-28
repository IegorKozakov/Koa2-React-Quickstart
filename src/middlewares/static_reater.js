
import fs from 'fs';
import send from 'koa-send';
import config from '../config';

const getFilepath = url => new Promise(resolve => {
  let filePath = url;

  if (filePath === '/') {
    filePath = '/index.html'
  }

  const statPath = `${config.app.static_path}${filePath}`;

  fs.stat(statPath, (err, stat) => {

    if (err || !stat.isFile()) {
      filePath = `/index.html`;
    }

    resolve(filePath);
  });
});

const staticReader = async (ctx, next) => {
  const url = ctx.request.url;

  if (url.substr(0, 5).toLowerCase() !== '/api/') {
    const filePath = await getFilepath(url);
    await send(ctx, filePath, {
      root: config.app.static_path
    });
  } else {
    await next();
  }
};


export default staticReader;