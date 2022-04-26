// 由于js的复杂数据类型是通过引用传值的，所以直接进行复制的话修改一个浅拷贝的对象会修改原对象的数据
// 实现一个深拷贝函数
let hashMap = new Map()
function deepClone(obj) {
    //根据输入的对象类型进行判断
    if (hashMap.has(obj)) {
        return hashMap.get(obj)
    }
    if (obj === null) { return null }
    if (obj === undefined) { return undefined }
    
    if (obj instanceof Array) {

        let newArray = []
        hashMap.set(obj, newArray)
        for (let item of obj) {
            newArray.push(deepClone(item))
        }
        return newArray
    } else if (obj instanceof Function) {
        console.log(obj,'ddd')
        if (!obj.prototype) {
            //通过判断函数的原型是否存在来判断该函数是否为箭头函数
            //原型不存在就判断为箭头函数
            return (...args) => { return obj(...args) }
        } else {
            return function (...args) {
                return obj.apply(this, args)
            }
        }
    } else{
        if(typeof obj !== 'object'){
            return obj
        }else{
            let newObj = {}
            let keys = Object.keys(obj)
            hashMap.set(obj, newObj)
            for (let key of keys) {
    
                newObj[key] = deepClone(obj[key])
            }
            return newObj
        }
    }
}
let a = [1, 2, 3, 4, 5]
let b = deepClone(a)
console.log(b)
let c = { x: 1, y: 2, z: a }
let d = deepClone(c)
d.z[0] = 888
console.log(c, d)
let e = { x: 0, y: (a) => { console.log(a) } }
e.x = e
let f = deepClone(e)
console.log(f.x)
f.y(1)