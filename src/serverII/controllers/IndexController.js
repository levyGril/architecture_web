/**
 * Created by levy on 2018/5/27.
 */
import { route, GET, POST, before } from 'awilix-koa';

// const IndexController =  {
//
//     indexAction(){
//         return async (ctx,next)=>{
//             const user = new User("levy.ji", 29);
//             const result = await user.getUserData();
//            // ctx.body = result;
//             ctx.render("index/pages/index",{data:result});
//         }
//     }
//
// };
//
// export default IndexController;
@route('/index.html')
export default class IndexController {
    constructor({ userService }) {
        this.userService = userService
    }

    @GET()
    async getUser(ctx,next) {
        console.log(this.userService);
        const result = await this.userService.getUserData();
        console.log(result);
        ctx.render("index/pages/index",{data:result});
    }
}