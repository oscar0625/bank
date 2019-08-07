// https://scarletsky.github.io/2017/12/23/write-javascript-document-by-jsdoc/

/**
 * @module
 * @name 书
 * @description 书籍
 * @param {string} content 书籍内容
 * @param {number} pageIndex 书籍页码 
 * @return {string} 当前页码内容   
 * @example 
 * book('书籍内容', 1)
 * 
 * @author <oscar>
 * @version 1.0.0
 */
function book(content, pageIndex) {
    return content.slice(pageIndex)
}

// 目录分类方式
// @class/@constructor 表示这是一个类 （在目录Classes中）
// @function/@method 表示这是一个函数/方法 （在目录Global中）
// @module 表示当前函数归属于当前js作为一个模块 （在目录Modules中）

// @private 表示该类/方法是私有的，JSDOC 不会为其生成文档。