/**
 * Created by levy on 2018/5/27.
 */
import Koa from 'koa';

import config from './config';
import render from 'koa-swig';
import serve from 'koa-static';
import co from 'co';
import log4js from 'log4js';
import errorHandler from './middlewares/errorHandler';

import { createContainer, asClass, asValue,Lifetime } from 'awilix';
// ioc控制饭庄的容器
const container = createContainer()
    // .register({
    //     userService: asClass(__dirname+'service/*.js')
    // });
const { loadControllers, scopePerRequest } = require('awilix-koa');
const app = new Koa();
// 每一次请求new request
app.use(scopePerRequest(container));
// The `TodosService` lives in services/TodosService
// 装载所有的services到controller，完成利用切面的注入
container.loadModules([__dirname+'/services/*.js'], {
    // we want `TodosService` to be registered as `todosService`.
    formatName: 'camelCase',
    resolverOptions: {
        // We want instances to be scoped to the Koa request.
        // We need to set that up.
        lifetime: Lifetime.SCOPED
    }
});

console.log(__dirname);
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
//所有的路由都切过来
app.use(loadControllers(__dirname+'/controllers/*.js', { cwd: __dirname }))
app.listen(config.port,()=>{
    console.log(`koa is starting, port :${config.port}`);
});


export default app;