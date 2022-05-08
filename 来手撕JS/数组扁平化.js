let arr = [1, 2, 3, [4, 5, [6, 7, 8, 9]]]

// ES6 flat函数实现 flat函数接收一个参数表示展平数组的深度 该函数会返回一个新数组
let flatArray = arr.flat(1)
console.log(flatArray)

// 不考虑深度的实现
Array.prototype.myFlat = function () {
    return this.reduce((prev, now) => {
        if (now instanceof Array) {
            return prev.concat(now.myFlat())
        } else {
            return prev.concat(now)
        }
    }, [])
}
console.log(arr.myFlat())

// 考虑展平的深度
Array.prototype.myDeepFlat = function (deep) {
    if (!deep) {
        return this
    }
    return this.reduce((prev, now) => {
        if (now instanceof Array) {
            return prev.concat(now.myDeepFlat(deep - 1))
        } else {
            return prev.concat(now)
        }
    }, [])
}
console.log(arr.myDeepFlat(1))
