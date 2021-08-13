/*
 * @Description: Description
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-08-13 13:54:02
 * @LastEditTime: 2021-08-13 16:25:41
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \js-essays\commonjs-esmodule\esmodule\a.mjs
 */

export var a1 = 1;
import { b1, b2 } from "./b.mjs";
console.log(b1, b2, "module a");
export var a2 = 11;

/**
 * 声明变量标识符为 let 时，会产生暂时性死区，
 * 所以在 b.mjs 跟 a.mjs 在同一个执行上下文
 * 那么也就可以理解成下面这样
 */

// 由于 import 的声明提升，所以 b.mjs 的代码在最前面
// let b1 = 2;
// // import { a1, a2 } from "./a.mjs";
// console.log(a1, a2, "module b");
// let b2 = 22;
// let a1 = 1;
// let a2 = 11;
// console.log(b1, b2, "module a");

// a.mjs已经请求过，但没有解析完，被标记为Fetching，（内部有一个Module Map，专门记录一个Module当前的状态，如果解析完成就获取它的Module Record(类似AST，会分析出该模块的import，export，获得依赖关系)；如果没有解析完成，则被标记为Fetching，不做处理，继续执行。），此时从a.mjs中没有任何导出，无法获取a1,a2（即为undefined)。