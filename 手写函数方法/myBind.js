// 请模拟实现一个bind函数
// bind的作用是返回一个新函数，并且将传入的第一个参数绑定为新函数的this

Function.prototype.myBind = function (thisArg, ...args) {
    const self = this
    return function (...newArgs) {
        return self.call(thisArg, ...args,...newArgs)
    }
}

//测试
const module = {
    x: 42,
    getX: function (a,b) {
        console.log(a + b)
        return this.x;
    }
}; 

const boundGetX = module.getX.myBind(module);
console.log(boundGetX());