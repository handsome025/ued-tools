var xlsx = require('node-xlsx')
var fs = require('fs')

var sheets = xlsx.parse(__dirname + '/example.xlsx')

var sheet0 = sheets[0]

var data = []

sheet0.data.forEach(function (item) {
    data.push(item)
})

fs.writeFile(__dirname + '/example.json', JSON.stringify(data), function () {
    console.log('json已成功生成!')
})