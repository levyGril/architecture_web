"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by levy on 2018/5/27.
 */

let config = {
    "viewDir": _path2.default.join(__dirname, '..', 'views'),
    "staticDir": _path2.default.join(__dirname, '..', 'assets')
};

const init = () => {
    if (false) {
        console.log("我是多余的。。。。。。");
    }
    if (process.env.NODE_ENV == "development") {
        const localConfig = {
            port: 8082
        };
        config = _lodash2.default.extend(config, localConfig);
    }

    if (process.env.NODE_ENV == "production") {
        const prodConfig = {
            port: 8082
        };
        config = _lodash2.default.extend(config, prodConfig);
    }
    return config;
};

exports.default = init();