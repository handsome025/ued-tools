angular.module('ued').service('User', function (Page) {
    /**
     * 获取登录后的用户信息
     * @returns {Object}
     */
    this.getUserInfo = function () {
        // !!! 请根据后端登录成功后写的 cookie 进行相应的模拟和修改
        if (ued.isLocal()) {
            ued.cookie.set('userInfo', {
                name: '用户名放这里'
            })
        }
        return ued.cookie.getObject('userInfo')
    }

    /**
     * 检查是否登录，如果没有登录，会立即跳转到登录页
     * 登录成功之后，会自动回来上一页
     * @param force 是否强制去登录页
     */
    this.checkLogin = function (force) {
        if (
            Page.current() !== 'login'
            && (force || ued.isEmpty(this.getUserInfo()))
        ) {
            ued.replace('login.html', {callback: ued.href()})
        }
    }
})
