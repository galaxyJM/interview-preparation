// promise.all 输入一个可迭代对象，对象中可包含多个promise，不是promise的会被转换成一个成功状态的promise
// 输出规则是如果输入的所有promise都成功 则按输入顺序输出所有的成功结果（注意输入的顺序）
// 若有一个失败就输出它的错误信息
Promise.myAll = function (iterable) {
    return new Promise((resolve, reject) => {
        let promises = [...iterable].map((p) => {
            return p instanceof Promise ? p : Promise.resolve(p)
        })
        let res = []
        let len = promises.length
        let count = 0
        if (!len) { resolve([]) }
        promises.map((p, index) => {
            p.then((data) => {
                res[index] = data
                count++
                if (count === len) {
                    resolve(res)
                }
            }, (e) => {
                console.log(1)
                reject(e)
            })
        })
    })
}
