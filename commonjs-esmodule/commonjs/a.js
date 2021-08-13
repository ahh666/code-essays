/*
 * @Description: Description
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-08-13 16:25:50
 * @LastEditTime: 2021-08-13 16:30:31
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \js-essays\commonjs-esmodule\commonjs\a.js
 */

exports.a = 1;
var b = require("./b");
console.log(b, "module a");
exports.a = 2;
