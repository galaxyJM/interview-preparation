const http = require('http')
const url = require('url')
let data = {'name': 'jifeng', 'company': 'taobao'};
const server = http.createServer((req,res)=>{
    let params = url.parse(req.url, true);
    res.end(params.query.callback + `(${JSON.stringify(data)})`)
})
server.listen(3001,()=>{
    console.log('服务开启成功')
})