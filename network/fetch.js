/*
 * @Description: fetch
 * @Refer: https://www.yuque.com/fe9/basic/rfwqry
 * @Author: owensiz
 * @Date: 2019-10-21 11:16:13
 * @Main: 
什么是 Fetch
Fetch 的一些基本概念
如何使用 Fetch
Fetch 的一些不足以及我们如何“优雅”的使用它
 */


// ---------1 什么是 Fetch


// Fetch 是一种新的用于获取资源的技术，它被用来代替我们已经吐槽了很久的技术（XHR）。
// Fetch 使用起来很简单，它返回的是一个 Promise，即使你没有 XHR 的开发经验也能快速上手。
fetch('https://github.com/frontend9/fe9-library', {
    method: 'get'
}).then(function(response) {
    
}).catch(function(err) {
    // Error
});


// ---------2 Fetch 基本概念
// 在 Fetch 中有四个基本概念，他们分别是 Headers、Request 、Response 和 Body。
// 在一个完整的 HTTP 请求中，其实就已经包含了这四个概念。请求中有请求头和请求体，响应中有响应头和响应体。
 