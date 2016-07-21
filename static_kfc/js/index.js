var app = angular.module('myApp', []);
app.controller('index', function ($scope, $http) {
    $scope.addUser = function () {
        var fd = new FormData();
        var file = document.querySelector('input[type=file]').files[0];
        fd.append('userName', $scope.userName);
        fd.append('userFace', file);
        $http({
            method: 'post',
            url: '../addUser',
            data: fd,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.success) {
                $scope.getUserList();
                $scope.userName = '';
            } else {
                if (response.msg == 'null') {
                    alert('毛线，参数为空');
                } else {
                    alert(response.msg);
                }
            }
        });
    };
    $scope.delUser = function (id) {
        $http.post("../delUser", {id: id})
            .success(function (response) {
                if (response.success) {
                    $scope.getUserList();
                } else {
                    if (response.msg == 'null') {
                        alert('毛线，参数为空');
                    } else {
                        alert(response.msg);
                    }
                }
            });
    };
    $scope.getUserList = function () {
        $http.post("../getUsers")
            .success(function (response) {
                if (response.success) {
                    $scope.users = response.rows;
                    $scope.isLogin = true;
                    $scope.getItemList();
                } else {
                    $scope.exit();
                }
            });
    };
    $scope.getItemList = function () {
        $http.post("../getItems")
            .success(function (response) {
                if (response.success) {
                    $scope.items = response.rows;
                } else {
                    alert(response.msg);
                }
            });
    };
    $scope.showMenu = function (user) {
        if (typeof(user.isShowMenu) == 'undefined') {
            $scope.hideAll();
            user.isShowMenu = true;
        } else {
            if (user.isShowMenu) {
                user.isShowMenu = false;
                user.isShowItems = false;
            } else {
                $scope.hideAll();
                user.isShowMenu = true;
            }

        }
        return user.isShowMenu;
    };
    $scope.showItems = function (user) {
        if (typeof(user.isShowItems) == 'undefined') {
            user.isShowItems = true;
        } else {
            user.isShowItems = !user.isShowItems;
        }
        return user.isShowItems;
    };
    $scope.addIt = function (user) {
        if (typeof(user.na) == 'undefined' || user.na.trim() == '' || typeof(user.nu) == 'undefined' || user.nu == 0 || typeof(user.pr) == 'undefined' || user.pr == 0) {
            alert('大概是没有输入完整，也许数据类型也不正确，而且数量和单价都不可以为0');
        } else {
            if (typeof(user.its) == 'undefined') {
                user.its = new Array();
                user.its.push({name: user.na, num: user.nu, price: user.pr});
            } else {
                user.its.push({name: user.na, num: user.nu, price: user.pr});
            }
            if (typeof(user.totalPrice) == 'undefined') {
                user.totalPrice = user.pr * user.nu;
            } else {
                user.totalPrice += user.pr * user.nu;
            }
            user.na = '';
            user.nu = '';
            user.pr = '';
        }
        $scope.getTotal();
        $scope.hideAll();
    };
    $scope.copyIt = function (item, user) {
        user.na = item.itemName;
        user.nu = 1;
        user.pr = item.itemPrice;
        user.isShowItems = false;
    };
    $scope.delIt = function (user, index) {
        var it = user.its[index];
        user.totalPrice -= it.price * it.num;
        user.its.splice(index, 1);
        $scope.getTotal();
    };
    $scope.getTotal = function () {
        $scope.totalPrice = 0;
        for (var i = 0; i < $scope.users.length; i++) {
            var p = $scope.users[i].totalPrice;
            if (typeof(p) == 'undefined') {
                p = 0;
            }
            $scope.totalPrice += p;
        }
        $scope.finalPrice = $scope.totalPrice + $scope.freight;
    };
    $scope.hideAll = function () {
        for (var i = 0; i < $scope.users.length; i++) {
            var u = $scope.users[i];
            u.isShowMenu = false;
            u.isShowItems = false;
        }
    };
    $scope.lockAll = function () {
        $scope.orders = new Array();
        for (var i = 0; i < $scope.users.length; i++) {
            var u = $scope.users[i];
            if (u.totalPrice > 0) {
                $scope.orders.push(u);
            }
        }
    };
    $scope.lockOrder = function () {
        $scope.lockAll();
        $http.post("../addOrder", {
                users: $scope.orders,
                total: $scope.totalPrice,
                final: $scope.finalPrice,
                freight: $scope.freight
            })
            .success(function (response) {
                if (response.success) {
                    $scope.goOrders();
                } else {
                    if (response.msg == 'null') {
                        alert('毛线，参数为空');
                    } else {
                        alert(response.msg);
                    }
                }
            });
    };
    $scope.editFreight = function () {
        var f = prompt('输入本次订单的运费', '');
        if (f != null) {
            if (f != '' && !isNaN(f)) {
                $scope.freight = parseInt(f);
                $scope.getTotal();
            } else {
                alert('运费格式无效');
            }
        } else {

        }
    };
    $scope.goOrders = function () {
        location.href = 'orders.html';
    };
    $scope.goItems = function () {
        location.href = 'items.html';
    };
    $scope.toggleEditUsers = function () {
        $scope.isEditUsers = !$scope.isEditUsers;
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
    $scope.isEditUsers = false;
    $scope.totalPrice = 0;
    $scope.freight = 9;
    $scope.finalPrice = $scope.totalPrice + $scope.freight;
    $scope.orders = new Array();
    $scope.getUserList();
});