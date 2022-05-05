let obj = {
    name: 'obj',
    function() {
        console.log(this.name)
    }, c: test
}
function test() {
    this.name = '1'
    console.log(this)
    return () => {
        return () => {
            this.name = '2'
            return () => {
                console.log(this.name)
            }
        }
    }
}
let f = c.test()

