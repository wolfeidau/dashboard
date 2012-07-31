//name space isolating closure
var DASH = new function() {

    if (document.location.hostname.match('localhost')){

        console.log("enabled less watch");

        less.watch();
    }

    var app = angular.module('dashboard', []);

    this.SystemListController = function ($scope, $http) {

        // do the initial load of items
        updateContentTable('Win32');

        // TODO load this list from the server
        var panes = $scope.panes = [
            {title:'Win32', selected:true},
            {title:'Linux', selected:false},
            {title:'VMWare', selected:false},
            {title:'Cisco PIXOS', selected:false}
        ];

        //var hosts = $scope.hosts = [];

        $scope.select = function(pane) {
            angular.forEach(panes, function(pane) {
                pane.selected = false;
            });
            pane.selected = true;


            updateContentTable(pane.title);
        };

        function updateContentTable(title) {
            $http({method: 'GET', url: '/samples/find.hqu.xml?prototypeName=' + title,
                transformResponse: function(data) {
                    var json = x2js.xml_str2json( data );
                    return json;
                }
            }).
                success(function(data, status, headers, config) {

                    DASH.data = data;

                    $scope.hosts = [];

                    angular.forEach(data.ResourcesResponse.Resource, function(res){

                        //var host = {hostname: res._name, ip: '1.1.1.1'};

                        $scope.hosts.push({id: res._id, hostname: res._name, ip: res.Agent._address});

                        //console.log(res._name);
                    });

                }).
                error(function(data, status, headers, config) {
                    // buggered if i know what to do in this case TODO WORK IT OUT.
                    console.log('status ' + status);
                })
        }

    };



};