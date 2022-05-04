function asyncPool(fn, arr, limit = 10) {
    let pool = []
    function request() {
        if (arr.length === 0) {
            return
        }
        let p = fn(arr.shift())
        if (pool.indexOf(p) !== -1 && pool.length <= limit) {
            pool.push(p)
        }
        p.then((data) => {
            console.log(data)
        }, (err) => {
            console.log(err)
        })
        p.finally(() => {
            pool.splice(pool.indexOf(p), 1)
            request()
        })
    }
    while (limit--) {
        request()
    }
}

function getData(num) {
    let p = new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log('传入的数值：', num)
            if (num <= 10) {
                console.log('符合条件，值为' + num)
                resolve(num);
            }
            else {
                reject('数字大于10了执行失败');
            }
        }, 1000);
    })
    return p
}
let nums = [1, 3, 9, 5, 6, 18, 1, 9, 7, 5, 3, 6]
asyncPool(getData, nums, 2)