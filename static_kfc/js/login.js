var app = angular.module('myApp', []);
app.controller('login', function ($scope, $http) {
    $scope.login = function () {
        if (typeof($scope.password) == 'undefined' || $scope.password == '') {
            alert('毛线，参数为空');
        } else {
            $http.post("../login", {password: $scope.password})
                .success(function (response) {
                    if (response.success) {
                        location.href = 'index.html';
                    } else {
                        if (response.msg == 'null') {
                            alert('毛线，参数为空');
                        } else {
                            alert(response.msg);
                        }
                    }
                });
        }

    };
});