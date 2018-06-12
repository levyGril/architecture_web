/**
 * Created by levy on 2018/5/27.
 */

import IndexController from './IndexController';

const controllerInit = {
    getAllRoutes(app, router) {
        app.use(router(_ => {
            _.get('/', IndexController.indexAction())
        }));
    }
};

export default controllerInit;
