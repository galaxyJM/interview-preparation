function myNew(Constructor, ...args) {
    let obj = Object.create(Constructor.prototype)
    Constructor.apply(obj, args) //执行构造函数 并且将新创建的临时对象绑定为构造函数的this
    return obj
}

function Person(name) {
    this.name = name
}
const person = myNew(Person, 'jiangmiao')