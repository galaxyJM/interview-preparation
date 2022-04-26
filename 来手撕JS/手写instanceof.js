function myinstanceof(target, construct) {
    //原理是查询构造函数的原型是否存在在目标的原型链上
    let proto = Object.getPrototypeOf(target)
    if (!proto) {
        return false
    } else {
        if (proto === construct.prototype) {
            return true
        }
        return myinstanceof(proto, construct)
    }
}
let a = () => { }
console.log(a instanceof Function)
console.log(myinstanceof(() => { }, Function))
console.log([a] instanceof Function)
console.log(myinstanceof([a], Function))
console.log([a] instanceof Array)
console.log(myinstanceof([a], Array))

