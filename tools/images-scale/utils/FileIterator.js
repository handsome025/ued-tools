var inherits = require("util").inherits;
var fs = require('fs');
var path = require('path');
var EventEmitter = require('events').EventEmitter;

/**
 * 文件遍历
 * @param root 目录, 默认为当前目录
 */
function FileIterator(root) {
    EventEmitter.call(this);
    this._deep = 0;
    this._readdir(root || '.');
}

inherits(FileIterator, EventEmitter);

FileIterator.prototype._readdir = function (root) {
    var self = this;
    fs.readdir(root, function (err, files) {
        if (err) {
            self.emit('error', err);
        } else {
            files.forEach(function (file) {
                file = path.join(root, file);
                var stats = fs.lstatSync(file);
                self.emit('next', file, stats);
                if (stats.isDirectory()) {
                    self.emit('dir', file, stats);
                    self._deep++;
                    self._readdir(file);
                }
                else {
                    self.emit('file', file, stats);
                }
            });
        }
        if (0 == self._deep--) {
            self.emit('end');
        }
    });
};

module.exports = FileIterator;