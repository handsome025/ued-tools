var images = require('images');
var FileIterator = require('./utils/FileIterator');

var fileIterator = new FileIterator(__dirname + '/images/');


fileIterator.on('file',function (file) {
    images(file)
        .size(320) // 等比缩小宽
        .save(file.replace('/images-scale/images/', '/images-scale/dist/'), {
            quality: 60 // 压缩质量
        })

    console.log(file)
    
}).on('end',function () {
    console.log('完成');
}).on('error', function (err) {
    console.log(err);
})

