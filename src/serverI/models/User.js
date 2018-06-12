/**
 * Created by levy on 2018/5/27.
 * @author levy.ji
 */

/**
 * User实体类
 * @class
 */
 class User{

    /**
     *
     * @param {string} name - 姓名
     * @param {number} age - 年龄
     * @constructor
     */
    constructor(name,age){
        this.name = name;
        this.age = age;
    }

    /**
     * 获取数据的api
     * @method getUserData
     * @returns {Promise} -- 返回异步数据处理结果
     */
    getUserData(){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve(this.name);
            },1000);
        })
    }
}

export default User;