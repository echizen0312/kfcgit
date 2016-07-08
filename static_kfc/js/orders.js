var app = angular.module('myApp', []);
app.controller('orders', function ($scope, $http) {
    $scope.getOrderList = function () {
        $http.post("../getOrders")
            .success(function (response) {
                if (response.success) {
                    $scope.orders = response.orders;
                    $scope.isLogin = true;
                } else {
                    $scope.exit();
                }
            });
    };
    $scope.goOrder = function (order) {
        $scope.showOrders = false;
        $scope.oid = order._id;
        $scope.getOrder($scope.oid);
    };
    $scope.goOrders = function () {
        $scope.showOrders = true;
        $scope.oid = '';
    };
    $scope.getOrder = function (oid) {
        if (oid != '') {
            $http.post("../getOrder", {id: oid})
                .success(function (response) {
                    if (response.success) {
                        var data = response.order;
                        $scope.users = data.users;
                        $scope.freight = data.freight;
                        $scope.getTotal();
                    } else {
                        alert(response.msg);
                    }
                });
        }
    };
    $scope.updateOrder = function (oid, users) {
        $http.post("../updateOrder", {oid: oid, users: users})
            .success(function (response) {
                if (response.success) {
                    $scope.getOrder($scope.oid);
                } else {
                    if (response.msg == 'null') {
                        alert('毛线，参数为空');
                    } else {
                        alert(response.msg);
                    }
                }
            });
    };
    $scope.getTotal = function () {
        $scope.totalPrice = 0;
        var pt = $scope.freight / $scope.users.length;
        for (var i = 0; i < $scope.users.length; i++) {
            var user = $scope.users[i];
            var its = user.its;
            user.totalPrice = 0;
            user.finalPrice = 0;
            for (var j = 0; j < its.length; j++) {
                var it = its[j];
                user.totalPrice += it.price * it.num;
            }
            $scope.totalPrice += user.totalPrice;
            user.finalPrice = (user.totalPrice + pt).toFixed(1);
        }
        $scope.finalPrice = $scope.totalPrice + $scope.freight;
    };
    $scope.getMoment = function (order) {
        return moment(order.createTime).format('YYYY-MM-DD HH:mm:ss');
    };
    $scope.getIsPay = function (user) {
        if (typeof(user.isPay) == 'undefined') {
            return true;
        } else {
            return !user.isPay;
        }
    };
    $scope.pay = function (user) {
        if (typeof(user.isPay) == 'undefined') {
            user.isPay = true;
        } else {
            user.isPay = !user.isPay;
        }
        $scope.updateOrder($scope.oid, $scope.users);
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
    $scope.showOrders = true;
    $scope.oid = '';
    $scope.totalPrice = 0;
    $scope.finalPrice = $scope.totalPrice + $scope.freight;
    $scope.getOrderList();
});