//容易忘记的地方，在emit的时候不要忘记传参
class EventBus {
    constructor() {
        this.subs = new Map()
    }
    on(type, fn) {
        let events = this.subs.get(type)
        if (!events) {
            events = []
            this.subs.set(type, events)
        }
        events.push(fn)
    }
    off(type, fn) {
        let events = this.subs.get(type)
        if (!events) { return }
        events.splice(events.indexOf(fn), 1)
        if (events.length === 0) { this.subs.delete(type) }
    }
    emit(type, ...args) {
        let events = this.subs.get(type)
        if (!events) { return }
        events.forEach((fn) => { fn(...args) })
    }
    once(type, fn) {
        const callback = (...args) => {
            fn(...args)
            this.off(type, callback)
        }
        this.on(type, callback)
    }
}

let test = new EventBus()
function eat(a) {
    console.log('吃饭')
    console.log(a)
}
function sleep(a) {
    console.log('睡觉')
    console.log(a)
}
function code(a) {
    console.log('写代码')
    console.log(a)
}
test.on('接下来要做的事', eat)
test.on('接下来要做的事', sleep)
test.on('接下来要做的事', code)
test.emit('接下来要做的事')