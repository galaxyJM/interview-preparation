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

// promise的失败请求功能
// 实现getData函数失败在一定次数之内重试
function getData() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            let num = Math.ceil(Math.random() * 20); //生成1-10的随机数
            console.log('随机数生成的值：', num)
            if (num <= 10) {
                console.log('符合条件，值为' + num)
                resolve(num);
            }
            else {
                reject('数字大于10了执行失败');
            }
        }, 2000);
    })
}
Promise.retry = function (fn, limit = 5, delay = 1000) {
    let count = 0
    return new Promise((resolve, reject) => {
        const run = () => {
            fn().then((data) => {
                console.log(data)
                resolve(data)
            }).catch((err) => {
                console.log(err)
                if (count <= limit) {
                    setTimeout(() => {
                        run()
                    }, delay)
                    count++
                } else {
                    reject(err)
                }
            })
        }
        run()
    })
}

//失败重试，到达限制输出缓存
Promise.retryAndCache = function (fn, options = {}) {
    let count = 0
    // 设置默认选项
    options = Object.assign({
        limit: 5,
        delay: 1000,
        isCache: false,
        cacheKey: '',
        cacheMaxAge: 0
    }, options)
    console.log(options)
    return new Promise((resolve, reject) => {
        const run = () => {
            fn().then((data) => {
                console.log(data)
                if (options.isCache) {
                    window.localStorage.setItem(options.cacheKey, JSON.stringify({
                        data,
                        maxAge: Date.now() + options.cacheMaxAge
                    }))
                }
                resolve(data)
            }).catch((err) => {
                if (count < options.limit) {
                    setTimeout(() => {
                        run()
                    }, options.delay)
                    count++
                } else {
                    if(options.isCache){
                        let cache = JSON.parse(window.localStorage.getItem(options.cacheKey))
                        if(cache && Date.now() < cache.maxAge){
                            resolve(cache.data)
                        }
                    }
                    reject(err)
                }
            })
        }
        run()
    })
}

Promise.retry(getData, 5, 2000)
Promise.retryAndCache(getData, {limit:3,delay: 0,isCache: true,cacheKey: 'lll',cacheMaxAge: 0})