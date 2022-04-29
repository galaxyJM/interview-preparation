// 实现一个 repeat 函数，它的第一个参数是一个函数，第二个参数为重复执行的次数，第三个参数为重复执行的间隔
// repeat 返回一个包装后的函数，如：
// const repeatFn = repeat(console.log, 4, 3000);
// repeatFn("hello");
// 将会输出四次 hello ，每两次之间间隔 3 秒

const { resolve } = require("path")

// 定时器写法
function repeat(fn, time, delay) {
    const self = this
    let count = 0
    return function (...args) {
        while (count < time) {
            setTimeout(() => {
                fn.apply(self, args)
            }, count * delay)
            count++
        }
    }
}
const repeatFn = repeat(console.log, 4, 3000);
repeatFn("hello");

// promise写法
function repeat2(fn, time, delay) {
    let count = 0 //记录执行的次数
    return function inner(...args) {
        fn(...args)  //执行第一次
        new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, delay)
        }).then(() => {
            if (count <= time) {
                inner(...args)
            }
        })   //创建一个异步任务，延时相应的时间，时间到了再次执行函数
    }
}
const repeatFn2 = repeat2(console.log, 4, 3000);
repeatFn2("hello");