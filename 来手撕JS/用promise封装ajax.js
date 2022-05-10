function ajax(url, method = 'get', body = null, headers = {}) {
    //需要四个参数，请求的地址，请求的方法，请求体的内容，请求头的内容
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open(method, url)
        for (let key in headers) {
            xhr.setRequestHeader(key, headers[key])
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.responseText)
                } else {
                    reject(xhr.status)
                }
            }
        }
        xhr.onerror = (err) => { reject(err) }
        xhr.send(body)
    })
}