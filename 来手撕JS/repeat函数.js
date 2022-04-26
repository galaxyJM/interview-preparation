// 实现一个 repeat 函数，它的第一个参数是一个函数，第二个参数为重复执行的次数，第三个参数为重复执行的间隔
// repeat 返回一个包装后的函数，如：
// const repeatFn = repeat(console.log, 4, 3000);
// repeatFn("hello");
// 将会输出四次 hello ，每两次之间间隔 3 秒

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