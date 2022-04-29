// 节流 一个按钮点了以后 在设定的延时时间之内无法再次点击
function throttle(fn,delay){
    let timer = null
    return (...args)=>{
       if(timer){
           return
       }
       fn(...args)
       timer = setTimeout(()=>{
            timer = null
       },delay)
    }
}

function add(a,b){
    console.log(a + b)
}

let newAdd = throttle(add,3000)
newAdd(2,3)