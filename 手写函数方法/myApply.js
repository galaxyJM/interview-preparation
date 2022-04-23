// 请模拟实现一个apply函数
// apply的作用是执行函数并绑定函数的this为传入的第一个参数,但后续参数的传入必须是一个数组
// 容易忽略的几个地方：
// 给thisArg添加属性时要注意不能覆盖原有的属性（所以采用Symbol）
// 注意传入的如果是null或者undefined要指向window（非严格模式）
// 注意函数的返回值也要在apply函数中返回

Function.prototype.myApply = function (thisArg, arr) {
    if (thisArg === null || thisArg === undefined) {
        thisArg = window
    } else if (!(arr instanceof Array)) {
        throw new Error('arr is not a Array')
        // 判断是否为数组
    }
    const self = this
    //由于是想要绑定this的函数fn调用了myCall，所以这里的this指的是fn本身
    //我们可以利用上面的特性来模拟实现this绑定
    const fn = Symbol()
    thisArg[fn] = self
    const result = thisArg[fn](...arr)
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
test.apply(obj, [10, 20])
test.myApply(obj, [10, 20])
test.myApply(obj, 1)

