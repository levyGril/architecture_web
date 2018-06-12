/**
 * Created by levy on 2018/5/27.
 */

import User from '../models/User';

const IndexController =  {

    indexAction(){
        return async (ctx,next)=>{
            const user = new User("levy.ji", 29);
            const result = await user.getUserData();
           // ctx.body = result;
            ctx.render("index/pages/index",{data:result});
        }
    }

};

export default IndexController;