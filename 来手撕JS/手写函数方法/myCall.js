// 请模拟实现一个call函数
// call的作用是执行函数并绑定函数的this为传入的第一个参数
// 容易忽略的几个地方：
// 给thisArg添加属性时要注意不能覆盖原有的属性（所以采用Symbol）
// 注意传入的如果是null或者undefined要指向window（非严格模式）
// 注意函数的返回值也要在call函数中返回

Function.prototype.myCall = function (thisArg, ...args) {
    // 此模拟采用了剩余参数的形式，还可以对arguments类数组对象进行处理
    // 首先要将arguments对象转换为数组对象
    // 可以利用Array.prototype.slice.call(arguments) 或者 [].slice.call(arguments) 或者 Array.from(arguments)
    // Array.prototype.slice.call(arguments)方法的原理是slice方法可以将一个含有length属性的this对象转换为数组
    // 但是在模拟call的函数里调用call是不是太奇怪了...(所以还是用剩余参数吧！)
    if (thisArg === null || thisArg === undefined) {
        thisArg = window
    }
    const self = this
    //由于是想要绑定this的函数fn调用了myCall，所以这里的this指的是fn本身
    //我们可以利用上面的特性来模拟实现this绑定
    const fn = Symbol()
    thisArg[fn] = self
    const result = thisArg[fn](...args)
    delete thisArg[fn]
    return result
}

function test(a, b) {
    console.log(a, b)
    console.log(this)
    return a + b
}
let obj = {
    x: 10
}
test.call(obj, 10, 20)
test.myCall(obj, 10, 20)

