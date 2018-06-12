"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by levy on 2018/5/27.
 * @author levy.ji
 */

/**
 * User实体类
 * @class
 */
let UserService = class UserService {

  /**
   *
   * @constructor
   */
  constructor() {}

  /**
   * 获取数据的api
   * @method getUserData
   * @returns {Promise} -- 返回异步数据处理结果
   */
  getUserData() {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve("levy.ji");
      }, 1000);
    });
  }
};
exports.default = UserService;