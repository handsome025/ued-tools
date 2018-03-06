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
