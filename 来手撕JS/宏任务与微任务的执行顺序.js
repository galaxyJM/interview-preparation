async function async1() {
    console.log(1)
    let data = await async2()
    console.log(2)
    data.then(()=>{console.log(10)})
}
function async2() {
    console.log(3)
    return new Promise((resolve) => {
        resolve(4)
    }).then((data)=>{
        console.log(data)
    })
}
async1()
console.log('end')
