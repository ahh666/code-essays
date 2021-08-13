/*
 * @Description: Description
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-08-13 13:54:06
 * @LastEditTime: 2021-08-13 14:39:32
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \js-essays\commonjs-esmodule\esmodule\b.mjs
 */

export let b1 = 2;
import { a1, a2 } from "./a.mjs";
console.log(a1, a2, "module b");
export let b2 = 22;
