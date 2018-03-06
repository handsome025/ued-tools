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