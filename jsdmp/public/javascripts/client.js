var app = angular.module('jsdmp', []);
app.factory('socket', function($rootScope) {
    var socket;
    // socket = io.connect("http://baldwin.codes:8080");
    socket = io.connect("localhost:8080");
    return {
        on: function(eventName, callback) {
            return socket.on(eventName, function() {
                var args;
                args = arguments;
                return $rootScope.$apply(function() {
                    return callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback) {
            return socket.emit(eventName, data, function() {
                var args;
                args = arguments;
                return $rootScope.$apply(function() {
                    return callback.apply(socket, args);
                });
            });
        }
    };
});
app.controller('AppCtrl', ['$scope', 'socket', function($scope, socket) {
    $scope.init = function() {
        socket.emit('job:request', {});
        $scope.num_computed = 0;
    };

    socket.on('job:new_job', function(job) {
        var data = job.data;
        $scope.job = data;
        var string_func = "(" + job.compute_function + ")";
        var compute_function = eval(string_func);
        var output = compute_function(data);
        socket.emit('job:completed', {
            result: output
        });
        socket.emit('job:request', {});
        $scope.num_computed += 1;
    });

    socket.on('init', function() {
        console.log('connected');
    })
}]);

app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  return $interpolateProvider.endSymbol(']]');
});
