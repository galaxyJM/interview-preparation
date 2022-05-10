let origin = {
    id: 1,
    children: [
        {
            id: 2,
            children: [
                { id: 4, children: [] },
                { id: 5, children: [] }
            ]
        },
        {
            id: 3,
            children: [
                { id: 6, children: [] },
                { id: 7, children: [] },
                { id: 8, children: [{ id: 10, children: [] }] },
                { id: 9, children: [] }
            ]
        }
    ]
}
let res = [{ id: origin.id, parentId: null }]
let queue = [origin]
while (queue.length) {
    let len = queue.length
    while (len) {
        let first = queue.shift()
        for (let child of first.children) {
            res.push({ id: child.id, parentId: first.id })
            queue.push(child)
        }
        len--
    }
}
console.log(res)
