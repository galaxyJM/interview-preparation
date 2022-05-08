// 能被promisify的函数必须满足两个条件
// 该函数的回调函数必须是参数的最后一个,并且回调函数的参数第一个必须为错误
// promisify函数将用callback对异步操作产生的数据或错误的处理转换为promise进行处理
function foo(str1, str2, callback) {
    setTimeout(() => {
        console.log('setTimeout')
        callback(str1, str2)
    }, 1000)
}
let promiseFoo = promisify(foo)
promiseFoo('hello', 'world')
    .then(res => {
        console.log(res)
    }).catch(err => console.log(err))

function promisify(fn) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            fn(...args, function (err, data) {
                if (!err) {
                    resolve(data)
                } else {
                    reject(err)
                }
            })
        })
    }
}
