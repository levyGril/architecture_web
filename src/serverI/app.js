/**
 * Created by levy on 2018/5/27.
 */
import Koa from 'koa';
import router from 'koa-simple-router';

import controllerInit from './controllers/controllerInit';

import config from './config';
import render from 'koa-swig';
import serve from 'koa-static';
import co from 'co';
import log4js from 'log4js';
import errorHandler from './middlewares/errorHandler';
const app = new Koa();
// 静态资源配置
app.use(serve(config.staticDir));
//模版配置
app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html'
}));
// log4js配置文件
log4js.configure({
    appenders: { cheese: { type: 'file', filename: `${__dirname}/logs/cheese.log` } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const logger = log4js.getLogger('cheese');
// 错误处理中心
errorHandler.error(app,logger);
//集中处理所有路由
controllerInit.getAllRoutes(app, router);
app.listen(config.port,()=>{
    console.log(`koa is starting, port :${config.port}`);
});


export default app;