;(function() {
/* ========== main.js ========== */

ued.ajax.mock('mock')

angular.module('ued', []).run(function (User) {
    if (!User.checkLogin()) {
        return
    }
    $.widget.bridge('uibutton', $.ui.button)
    $('[data-toggle="tooltip"]').tooltip()
    $('[data-widget="tree"]').tree()
    $(window).trigger('resize')
})

angular.element(document).ready(function () {
    angular.bootstrap(document, ['ued'])
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
/* ========== page/example.js ========== */

angular.module('ued').controller('example', function ($scope, Page) {
    Page.show()
})


})();

;(function() {
/* ========== page/index.js ========== */

angular.module('ued').controller('index', function ($scope, Page, User) {
    $scope.userInfo = User.getUserInfo()

    // 应该是从接口获取，此处写死是示例
    $scope.menuList = [
        {
            type: 'header',
            name: '我是文字'
        },
        {
            type: 'treeview',
            name: '我是菜单',
            child: [
                {name: 'example', link: 'example.html'},
                {name: 'abc', link: 'abc.html'},
                {name: 'abc', link: 'abc.html'}
            ]
        },
        {
            type: 'treeview',
            name: '我是菜单',
            child: [
                {name: 'abc', link: 'abc.html'},
                {name: 'abc', link: 'abc.html'},
                {name: 'abc', link: 'abc.html'}
            ]
        },
        {
            type: 'header',
            name: '我是文字2'
        },
        {
            type: 'treeview',
            name: '我是菜单2',
            child: [
                {name: 'abc', link: 'abc.html'},
                {name: 'abc', link: 'abc.html'},
                {name: 'abc', link: 'abc.html'}
            ]
        }
    ]

    $('.sidebar-menu').on('click', 'a', function (event) {
        var href = $(event.target).attr('href')
        if (href && href !== '#') {
            $('.content-iframe > iframe').attr('src', href)
        }
        return false
    })

    Page.show()
})


})();

;(function() {
/* ========== page/login.js ========== */

angular.module('ued').controller('login', function ($scope, Api, Page) {
    $scope.onConfirm = function () {
        var formData = {
            username: $scope.username,
            password: $scope.password
        }
        if (ued.isEmpty(formData.username) || ued.isEmpty(formData.password)) {
            $scope.tips = {
                type: 'warning',
                msg: '用户名或密码不能为空'
            }
            return
        }
        $scope.tips = null
        $scope.loading = true
        Api.login(formData).then(function (res) {
            // 如果有 callback 参数，则跳到 callback
            // 否则跳到首页
            ued.replace(ued.query('callback') || 'index.html')
        }, function (res) {
            $scope.loading = false
            $scope.tips = {
                type: 'warning',
                msg: res.errorMsg
            }
        })
    }

    Page.show()
})


})();

;(function() {
/* ========== service/Api.js ========== */

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


})();

;(function() {
/* ========== service/Page.js ========== */

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


})();

;(function() {
/* ========== service/User.js ========== */

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


})();

;(function() {
/* ========== templates.js ========== */

angular.module('ued').run(['$templateCache', function($templateCache) {$templateCache.put('page/example.html','<section class="content-header">\n    <h1>\u793A\u4F8B <small>\u7EC4\u4EF6\u4F7F\u7528\u793A\u4F8B</small></h1>\n    <ol class="breadcrumb">\n        <li>\n            <a href="a.html"><i class="fa fa-dashboard"></i> AAA</a>\n        </li>\n        <li>\n            <a href="b.html">BBB</a>\n        </li>\n        <li class="active">\n            <span>\u793A\u4F8B</span>\n        </li>\n    </ol>\n</section>\n\n<section class="content">\n    <div class="row">\n        <div class="col-md-6">\n            <div class="box box-{{color || \'primary\'}}">\n                <div class="box-header with-border">\n                    <h3 class="box-title">\u76D2\u5B50</h3>\n                </div>\n                <div class="box-body">\n                    <p>test</p>\n                    <div class="btn-group pull-right">\n                        <button type="button" class="btn btn-flat btn-primary" ng-click="loading = true">\u70B9\u51FB\u6A21\u62DF\u52A0\u8F7D</button>\n                        <button type="button" class="btn btn-flat btn-default" ng-click="color = \'danger\'">\u70B9\u51FB\u5207\u6362\u989C\u8272</button>\n                    </div>\n                </div>\n                <div class="overlay" ng-show="loading">\n                    <i class="fa fa-refresh fa-spin"></i>\n                </div>\n            </div>\n        </div>\n        <div class="col-md-6">\n            <div class="nav-tabs-custom">\n                <ul class="nav nav-tabs pull-right">\n                    <li><a href="#tab2" data-toggle="tab" aria-expanded="false">Area</a></li>\n                    <li class="active"><a href="#tab1" data-toggle="tab" aria-expanded="true">Donut</a></li>\n                    <li class="pull-left header"><i class="fa fa-inbox"></i> Sales</li>\n                </ul>\n                <div class="tab-content">\n                    <div class="chart tab-pane" id="tab2">\n                        <p>Area</p>\n                    </div>\n                    <div class="chart tab-pane active" id="tab1">\n                        <p>Donut</p>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</section>');
$templateCache.put('page/index.html','<div class="wrapper">\n    <header class="main-header">\n        <a href="index.html" class="logo">\n            <span class="logo-mini">\u7BA1</span>\n            <span class="logo-lg">\u540E\u53F0\u7BA1\u7406\u7CFB\u7EDF</span>\n        </a>\n        <nav class="navbar navbar-static-top">\n            <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">\n                <span class="icon-bar"></span>\n                <span class="icon-bar"></span>\n                <span class="icon-bar"></span>\n            </a>\n            <div class="navbar-custom-menu">\n                <ul class="nav navbar-nav">\n                    <li data-toggle="tooltip" data-placement="bottom" title="\u9000\u51FA\u767B\u5F55">\n                        <a href="login.html">\n                            {{userInfo.name}} <i class="fa fa-fw fa-sign-out"></i>\n                        </a>\n                    </li>\n                </ul>\n            </div>\n        </nav>\n    </header>\n\n    <aside class="main-sidebar">\n        <section class="sidebar">\n            <ul class="sidebar-menu" data-widget="tree">\n                <li class="{{menu.type}}" ng-repeat="menu in menuList track by $index">\n                    <span ng-if="menu.type == \'header\'">{{menu.name}}</span>\n                    <a ng-if="menu.type != \'header\'" href="{{menu.link}}">\n                        <i class="fa {{menu.icon || \'fa-th\'}}"></i> <span>{{menu.name}}</span>\n                        <span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>\n                    </a>\n                    <ul ng-if="menu.type == \'treeview\' && menu.child.length" class="treeview-menu">\n                        <li ng-repeat="child in menu.child track by $index">\n                            <a href="{{child.link}}"><i class="fa {{child.icon || \'fa-circle-o\'}}"></i> {{child.name}}</a>\n                        </li>\n                    </ul>\n                </li>\n            </ul>\n        </section>\n    </aside>\n\n    <div class="content-wrapper">\n        <div class="content-iframe">\n            <iframe src="example.html"></iframe>\n        </div>\n    </div>\n</div>\n');
$templateCache.put('page/login.html','<div class="login-box">\n    <div class="login-logo">\n        \u540E\u53F0\u7BA1\u7406\u7CFB\u7EDF\n    </div>\n    <div class="login-box-body">\n        <p class="login-box-msg">\u8BF7\u767B\u5F55\u540E\u518D\u64CD\u4F5C</p>\n        <div class="form-group has-feedback">\n            <input type="text" class="form-control" placeholder="\u7528\u6237\u540D" ng-model="username">\n            <span class="glyphicon glyphicon-envelope form-control-feedback"></span>\n        </div>\n        <div class="form-group has-feedback">\n            <input type="password" class="form-control" placeholder="\u5BC6\u7801" ng-model="password">\n            <span class="glyphicon glyphicon-lock form-control-feedback"></span>\n        </div>\n        <div class="row">\n            <div class="col-xs-8">\n            </div>\n            <div class="col-xs-4">\n                <button type="submit" class="btn btn-primary btn-block btn-flat" ng-class="{disabled: loading}" ng-click="onConfirm()">\n                    {{loading ? \'\u767B\u5F55\u4E2D...\' : \'\u767B\u5F55\'}}\n                </button>\n            </div>\n        </div>\n        <div class="alert alert-{{tips.type}} alert-dismissible tips" ng-show="tips">\n            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">\xD7</button>\n            {{tips.msg}}\n        </div>\n    </div>\n</div>\n');}]);

})();

//# sourceMappingURL=app.js.map
