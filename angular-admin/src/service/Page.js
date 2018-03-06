angular.module('ued').service('Page', function () {
    /**
     * 显示页面
     */
    this.show = function () {
        $('.page').show()
    }

    /**
     * 隐藏页面
     */
    this.hide = function () {
        $('.page').hide()
    }

    /**
     * 获取当前页面名字
     */
    this.current = function () {
        return $('html').data('page')
    }
})
