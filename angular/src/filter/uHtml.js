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