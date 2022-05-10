Object.MyAssign = function (obj, ...args) {
    // 利用null == undefined来一起判断出null和undefined
    if (obj == null) {
        throw new TypeError('Cannot convert undefined or null to object')
    }
    let target = Object(obj)
    for (let origin of args) {
        if (origin != null) {
            for (let key in origin) {
                if (origin.hasOwnProperty(key)) {
                    target[key] = origin[key] //根据MDN后续源对象的相同的键值属性会覆盖前一个
                }
            }
        }
    }
    return target
}

console.log(Object.assign({ a: '我是谁？' }, { a: '我是你的爸爸' }, { b: 'hhhhhh', c: 'lalala' }))
console.log(Object.MyAssign({ a: '我是谁？' }, { a: '我是你的爸爸' }, { b: 'hhhhhh', c: 'lalala' }))