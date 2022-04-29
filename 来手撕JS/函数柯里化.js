function currify(fn) {
    let len = fn.length
    //一个函数本质是一个对象，每个函数对象都有两个属性length和prototype
    // length属性保存了函数定义时参数的个数
    let nums = []
    return function inner(...args) {
        nums.push(...args)
        if(nums.length === len){
            return fn(...nums)
        }else{
            return inner
        }
    }
}
function add(a,b,c,d,e){
    return a + b + c + d + e
}

console.log(currify(add)(1, 2, 3, 4, 5)); 
console.log(currify(add)(1)(2)(3)(4)(5)); 
console.log(currify(add)(1, 2, 3)(4, 5)); 
console.log(currify(add)(1)(2, 3)(4)(5));