var openedu = angular.module('openedu', ['ui.bootstrap', 'imageupload', 'sticky', 'ui.mask']);

openedu.directive('imageonload', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('load', function () {
                element.parent().imgLiquid();
            });
        }
    };
});