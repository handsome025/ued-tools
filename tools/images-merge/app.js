var images = require('images');
var FileIterator = require('./utils/FileIterator');

var fileIterator = new FileIterator(__dirname + '/images/');
var imgs = [];
var width = 0;
var height = 0;

fileIterator.on('file',function (file) {
    var img = images(file);
    width = Math.max(img.width(), width);
    height = Math.max(img.height(), height);

    imgs.push(img);
    console.log(file);

}).on('end',function () {
    var count = 0;
    var output = images(width * imgs.length, height);
    imgs.forEach(function (img) {
        output.draw(images(img), width * count++, 0);
    });
    output.save('横向.png');

    //------------------------------------------

    count = 0;
    output = images(width, height * imgs.length);
    imgs.forEach(function (img) {
        output.draw(images(img), 0, height * count++);
    });
    output.save('竖向.png');

    console.log('\n在当前目录已自动生成横向和竖向合并的图像!\n');
}).on('error', function (err) {
    console.log(err);
})

