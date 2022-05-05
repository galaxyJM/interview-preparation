//vue3
//副作用函数
// function effect(){
//     document.body.innerText = obj.text
// }
//什么是响应式，就是当副作用函数中的响应式数据发生变化，该副作用函数会自动执行
//在读取数据的时候为该数据注册相应的副作用函数
//在改变数据时自动更新相应的副作用函数

//数据结构
//以对象为基本单位，每个对象有多个属性，每个属性会对应多个副作用函数
let bucket = new WeakMap()

//注册副作用函数的函数
let activeEffect
let dep = new Map()
function changeText() {
    document.body.children[0].innerText = obj.text
}
function effect(fn) {
    activeEffect = fn //将要注册的匿名函数传递到全局，以便添加依赖
    fn() //第一次执行副作用函数，触发proxy的get，添加依赖
}

//响应式数据
let data = {
    text: '写一个简易的响应式系统'
}
let obj = new Proxy(data, {
    get(target, key) {
        if (!activeEffect) { return target[key] } //说明不是读取响应式数据，直接返回原始值
        let depsMap = bucket.get(target) //取出当前原始对象对应的依赖map
        if (!depsMap) {
            depsMap = new Map()
            bucket.set(target, depsMap)
        }
        let deps = depsMap.get(key)
        if (!deps) {
            deps = new Set()
            depsMap.set(key, deps)
        }
        deps.add(activeEffect)
        return target[key]
    },
    set(target, key, value) {
        target[key] = value
        let depsMap = bucket.get(target)
        if (!depsMap) {
            return
        }
        let deps = depsMap.get(key)
        deps && deps.forEach((dep) => dep())
    }
})

effect(changeText)

