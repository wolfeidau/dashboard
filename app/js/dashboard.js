//name space isolating closure
var DASH = new function() {

    var app = angular.module('dashboard', []);

    this.SystemListController = function ($scope) {

        // TODO load this list from the server
        var panes = $scope.panes = [
            {title:'Win32', selected:true},
            {title:'Linux', selected:false},
            {title:'VMWare', selected:false},
            {title:'Cisco PIXOS', selected:false}
        ];

        $scope.select = function(pane) {
            angular.forEach(panes, function(pane) {
                pane.selected = false;
            });
            pane.selected = true;
        }

    }

};