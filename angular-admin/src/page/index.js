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
