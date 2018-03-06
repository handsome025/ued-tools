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
