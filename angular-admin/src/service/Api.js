angular.module('ued').service('Api', function () {
    /**
     * 调用登录接口的示例
     * @param data
     * @returns {Promise}
     */
    this.login = function (data) {
        return ued.post('/api/login', data)
    }
})
