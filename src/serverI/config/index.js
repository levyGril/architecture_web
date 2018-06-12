/**
 * Created by levy on 2018/5/27.
 */

import _ from "lodash";
import path from 'path';
let config= {
    "viewDir":path.join(__dirname,'..', 'views'),
    "staticDir":path.join(__dirname,'..', 'assets')
};

const init = ()=>{
    if(false){
        console.log("我是多余的。。。。。。");
    }
    if(process.env.NODE_ENV == "development"){
        const localConfig = {
            port: 8082
        };
        config = _.extend(config, localConfig);
    }

    if(process.env.NODE_ENV == "production"){
        const prodConfig = {
            port: 8082
        };
        config = _.extend(config, prodConfig);
    }
    return config;
};

export default init();