'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _koaSwig = require('koa-swig');

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

var _errorHandler = require('./middlewares/errorHandler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _awilix = require('awilix');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ioc控制饭庄的容器
/**
 * Created by levy on 2018/5/27.
 */
const container = (0, _awilix.createContainer)();
// .register({
//     userService: asClass(__dirname+'service/*.js')
// });
const { loadControllers, scopePerRequest } = require('awilix-koa');
const app = new _koa2.default();
// 每一次请求new request
app.use(scopePerRequest(container));
// The `TodosService` lives in services/TodosService
// 装载所有的services到controller，完成利用切面的注入
container.loadModules([__dirname + '/services/*.js'], {
    // we want `TodosService` to be registered as `todosService`.
    formatName: 'camelCase',
    resolverOptions: {
        // We want instances to be scoped to the Koa request.
        // We need to set that up.
        lifetime: _awilix.Lifetime.SCOPED
    }
});

console.log(__dirname);
// 静态资源配置
app.use((0, _koaStatic2.default)(_config2.default.staticDir));
//模版配置
app.context.render = _co2.default.wrap((0, _koaSwig2.default)({
    root: _config2.default.viewDir,
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html'
}));
// log4js配置文件
_log4js2.default.configure({
    appenders: { cheese: { type: 'file', filename: `${__dirname}/logs/cheese.log` } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const logger = _log4js2.default.getLogger('cheese');
// 错误处理中心
_errorHandler2.default.error(app, logger);
//所有的路由都切过来
app.use(loadControllers(__dirname + '/controllers/*.js', { cwd: __dirname }));
app.listen(_config2.default.port, () => {
    console.log(`koa is starting, port :${_config2.default.port}`);
});

exports.default = app;