var app = angular.module('jsdmp', []);
app.factory('socket', function($rootScope) {
    var socket;
    socket = io.connect("http://localhost:8080");
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
    };

<<<<<<< HEAD
  socket.on('job:new_job', function(job) {
      console.log('job', job)
      var data = job.data;
      //var output = eval(job.compute_function(data));
      var func = eval(job.compute_function);
      var output = func(job.data);
      socket.emit('job:completed', {
          result: output
      });
  });
=======
    socket.on('job:new_job', function(job) {
        console.log('job', job)
        var data = job.data;
        //   var output = job.compute_function(data);
        var string_func = "(" + job.compute_function + ")";
        var func = eval(string_func);
        console.log('func', func)
        socket.emit('job:completed', {
            result: output
        });
    });
>>>>>>> c32e212a3b7854ca25d9c9e2c51779472daf7a2f

    socket.on('init', function() {
        console.log('connected');
    })
}]);
