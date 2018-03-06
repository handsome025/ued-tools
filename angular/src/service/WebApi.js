angular.module('ued').service('WebApi', function () {
    /**
     * 示例，应该删除
     */
    this.test = function () {
        return ued.get('/hello').then(function (res) {
            // 可以先做一些数据处理等操作 再返回想要的内容，
            // 下一次 then 就是这里 return 的值
            var result = res.result
            result.abcd = 1234
            return result
        })
    }

    this.abc = function () {
        return ued.post('/abc', {d: 'e'})
    }
})
