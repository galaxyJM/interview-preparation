let arr = [1, 2, 2, 3, 3, 4, 4, 5, 5, 5]

function unrepeat(arr) {
    let hashMap = {}
    let res = []
    for (let item of arr) {
        if (!hashMap[item]) {
            hashMap[item] = true
            res.push(item)
        } else {
            continue
        }
    }
    return res
}

console.log(unrepeat(arr))