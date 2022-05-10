// 节流 一个按钮点了以后 在设定的延时时间之内无法再次点击
function throttle(fn, delay) {
    let timer = null
    return (...args) => {
        if (timer) {
            return
        }
        fn(...args)
        timer = setTimeout(() => {
            timer = null
        }, delay)
    }
}

function add(a, b) {
    console.log(a + b)
}

let newAdd = throttle(add, 3000)
newAdd(2, 3)

// 防抖 当用户的操作频繁触发事件时可以使用，如input的oninput事件，要实现用户输入完毕后一段时间再触发事件可以使用防抖
function debounce(fn, delay) {
    let timer
    return (...args) => {
        if (timer) {
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn(...args)
            }, delay)
        } else {
           timer = setTimeout(() => {
                fn(...args)
            }, delay)
        }
    }
}
function add(a, b) {
    console.log(a + b)
}

let newAdd2 = debounce(add, 3000)
newAdd2(2, 3)
