var app = angular.module('myApp', []);
app.controller('items', function ($scope, $http) {
    $scope.addItem = function () {
        if ($scope.itemName.trim() == '' || typeof($scope.itemPrice) == 'undefined' || $scope.itemPrice == 0) {
            alert('大概是没有输入完整，也许数据类型也不正确，而且单价不可以为0');
        } else {
            var data;
            if (typeof($scope.sortNum) == 'undefined') {
                data = {
                    itemName: $scope.itemName,
                    itemPrice: $scope.itemPrice
                };
            } else {
                data = {
                    itemName: $scope.itemName,
                    itemPrice: $scope.itemPrice,
                    sortNum: $scope.sortNum
                };
            }
            $http.post("../addItem", data)
                .success(function (response) {
                    if (response.success) {
                        $scope.getItemList();
                        $scope.itemName = '';
                        $scope.itemPrice = '';
                        $scope.sortNum = '';
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
    $scope.delItem = function (id) {
        $http.post("../delItem", {id: id})
            .success(function (response) {
                if (response.success) {
                    $scope.getItemList();
                } else {
                    if (response.msg == 'null') {
                        alert('毛线，参数为空');
                    } else {
                        alert(response.msg);
                    }
                }
            });
    };
    $scope.getItemList = function () {
        $http.post("../getItems")
            .success(function (response) {
                if (response.success) {
                    $scope.items = response.rows;
                    $scope.isLogin = true;
                } else {
                    $scope.exit();
                }
            });
    };
    $scope.goIndex = function () {
        location.href = 'index.html';
    };
    $scope.exit = function () {
        $http.get("../exit", {})
            .success(function (response) {
                if (response.success) {
                    location.href = 'login.html';
                } else {
                    alert(response.msg);
                }
            });
    };
    $scope.isLogin = false;
    $scope.itemName = '';
    $scope.itemPrice = '';
    $scope.sortNum = '';
    $scope.getItemList();
});