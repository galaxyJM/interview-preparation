const getData = () => new Promise(resolve => setTimeout(() => resolve("这是数据"), 1000))

function* testG() {
    const data = yield getData()
    console.log('data: ', data);
    const data2 = yield getData()
    console.log('data2: ', data2);
    return 'success'
}

function asyncToGenerator(generator) {
    return function () {
        const gen = generator() //得到生成器
        return new Promise((reslove, reject) => {
            function step(key, arg) {
                let genResult
                try {
                    genResult = gen[key](arg)
                } catch (err) {
                    return reject(err)
                }
                let { value, done } = genResult
                if (done) {
                    return reslove(value)
                } else {
                    return Promise.resolve(value).then((val) => { step('next', val) }, (err) => { step('throw', err) })
                }
            }
            step('next')
        })
    }
}

//测试
const res = asyncToGenerator(testG)
res().then((data)=>{
    console.log(data)
})

async function test() {
    const data = await getData()
    console.log('data: ', data);
    const data2 = await getData()
    console.log('data2: ', data2);
    return 'success'
}
test().then((data)=>{
    console.log(data)
})