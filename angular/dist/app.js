;(function() {
/* ========== main.js ========== */

/*
 |--------------------------------------------------------------------------
 | 设置本地模拟接口的目录
 |--------------------------------------------------------------------------
 | 如果不需要模拟 则删除此行
 |
 |
 */

ued.ajax.mock('mock')

/*
 |--------------------------------------------------------------------------
 | 解决移动端 click 300ms 延迟
 |--------------------------------------------------------------------------
 | 如果页面比较特殊会出现 BUG 则删除此行
 |
 |
 */

ued.fastclick()

/*
 |--------------------------------------------------------------------------
 | 微信 JSSDK 配置
 |--------------------------------------------------------------------------
 | 上线后，如果是 umaman.com 结尾的域名，这里不用改动
 | 如果是外部接口或者有特殊需求，请查看文档 /frontend/public/ued.js/doc/api.html
 |
 */

ued.weixin.uma()

/*
 |--------------------------------------------------------------------------
 | 隐藏微信右上角分享按钮
 |--------------------------------------------------------------------------
 | 如果不需要隐藏，则删除此行
 | 如果想刚开始隐藏，等待 JSSDK 加载成功后才显示，也可以保留这行代码，不用删
 |
 */

// wx.ready(function () {
//     wx.hideOptionMenu()
// })

/*
 |--------------------------------------------------------------------------
 | 设置微信分享
 |--------------------------------------------------------------------------
 | 会在 config 成功后自动触发
 | 可以多次设置，会覆盖前面的设置
 |
 */

ued.weixin.share({
    title: '',
    desc: '',
    link: ued.path('index.html'),
    imgUrl: ued.path('static/test.jpg')
})

/*
 |--------------------------------------------------------------------------
 | 百度统计
 |--------------------------------------------------------------------------
 | ued.baidu.track('百度统计代码问号后面那一串内容')，多个可以用数组
 |
 |
 */

// ued.baidu.track('???')

/*
 |--------------------------------------------------------------------------
 | ICC 统计
 |--------------------------------------------------------------------------
 | ued.track('填 openid')
 | 如果这个时候还拿不到openid 就在拿到之后再调用一次 ued.track() 和 ued.trackPage()
 |
 */

// ued.track('???')
ued.trackPage()

/*
 |--------------------------------------------------------------------------
 | 定义 angular 模块
 |--------------------------------------------------------------------------
 | run 里可以注入 service 执行一些初始化逻辑
 | 如果不涉及 service 的调用，可以直接写在 run 外面
 |
 */

angular.module('ued', []).run(function () {

})

/*
 |--------------------------------------------------------------------------
 | 加载主题
 |--------------------------------------------------------------------------
 | 主题名：通常是从接口获取、或者从 cookie 获取
 | 是否插入模式：如果是从异步接口获取的数据再加载主题，需要设置为 true
 |
 */

loadTheme('default')

function loadTheme (theme, append) {
    if (theme && theme != 'default') {
        var version = $('html').data('version')
        var css = 'dist/theme-' + theme + '.css?' + version
        var js = 'dist/theme-' + theme + '.js?' + version
        if (append) {
            Promise.all([ued.loadStyle(css), ued.loadScript(js)]).then(bootstrap)
            return
        }
        document.write('<link rel="stylesheet" href="' + css + '">')
        document.write('<script src="' + js + '"></script>')
    }
    bootstrap()
}

function bootstrap () {
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['ued'])
    })
}


})();

;(function() {
/* ========== component/uRender.js ========== */

/**
 * 拿到标签渲染完的回调
 *
 * @example
 *  <div u-render="onRender()"></div>
 */
angular.module('ued').directive('uRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(function () {
                scope.$eval(attrs.ngBindHtml)
            }, function (value) {
                $timeout(function () {
                    scope.$eval(attrs.uRender, {$element: element})
                })
            })
        }
    }
})

})();

;(function() {
/* ========== filter/uHtml.js ========== */

/**
 * 输出富文本
 *
 * @example
 *  <div ng-bind-html="xxx | uHtml"></div>
 */
angular.module('ued').filter('uHtml', function ($sce) {
    return function (source) {
        return $sce.trustAsHtml(source)
    }
})

})();

;(function() {
/* ========== page/index.js ========== */

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


})();

;(function() {
/* ========== service/WebApi.js ========== */

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


})();

;(function() {
/* ========== templates.js ========== */

angular.module('ued').run(['$templateCache', function($templateCache) {$templateCache.put('page/example.html','<p>example</p>\n');
$templateCache.put('page/index.html','<img src="static/test.jpg" alt="">\n\n<div class="ued-pop">\n    <div class="ued-center">\n        <p>{{ hello }}</p>\n    </div>\n</div>\n');}]);

})();

//# sourceMappingURL=app.js.map
