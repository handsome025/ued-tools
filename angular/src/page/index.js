angular.module('ued').directive('pageIndex', function (WebApi) {
    return {
        templateUrl: 'page/index.html',
        restrict: 'E',
        link: function (scope) {
            ued.title('首页')

            scope.goHello = function () {
                ued.href('hello.html')
            }

            getHello()

            function getHello() {
                var loading = weui.loading('加载中...')
                WebApi.test()
                    .always(loading.hide)
                    .then(function (res) {
                        scope.hello = res

                        // 每个页面请求完显示画面后 调用统计时间
                        ued.trackLoadingTime()
                    }, weui.alert)
                // statusCode 209 的判断已经封装在 weui 内部，大家不需要手动判断 209 啦
                // 这个 weui 是为公司的项目改造过的版本（源码可以查看 weui.js 头部注释的网址）
                // 可以传入接口返回的对象，也可以传入普通的字符串
            }
        }
    }
})
