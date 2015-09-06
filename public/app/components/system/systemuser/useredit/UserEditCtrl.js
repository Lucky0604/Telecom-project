angular.module('UserEditCtrl', [])
    .controller('UserEditCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
        var id = $routeParams.id;
        $scope.sexList = [{
            "code": "1",
            "value": "男士"
        }, {
            "code": "0",
            "value": "女士"
        }];
        $.ajax({
            type: 'get',
            url: "http://192.168.1.99:8989/dxjf/platform/user/query/" + id,
            async: false,
            contentType: "application/x-www-form-urlencoded; charset=gbk",
            data: {
                "id": id
            },
            dataType: 'json',
            success: function(data, status) {
                var rstate = data.result;
                if (rstate == '0') {
                    $scope.user = data.message.user;
                } else {
                    alert(data.error);
                }
            },
            error: function(data, status, e) {
                alert(e);
            }
        });
        $scope.submit = function() {
            if (Util.strIsEmpty($scope.user.username)) {
                alert("用户名不能为空!");
                return;
            }
            if (Util.strIsEmpty($scope.user.useraccount)) {
                alert("用户账号不能为空!");
                return;
            }
            if (Util.strIsEmpty($scope.user.userphone)) {
                alert("用户手机不能为空!");
                return;
            }
            if (Util.strIsEmpty($scope.user.depid)) {
                alert("部门名称不能为空!");
                return;
            }
            if (Util.strIsEmpty($scope.user.password)) {
                alert("用户密码不能为空!");
                return;
            }
            if (Util.strIsEmpty($scope.user.usersex)) {
                alert("性别不能为空!");
                return;
            } else if (!Util.strIsEmpty($scope.user.regtime)) {
                alert("注册时间不能为空!");
                return;
            }
            $.ajax({
                type: 'get',
                url: 'http://192.168.1.99:8989/dxjf/platform/user/save4ang',
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=gbk",
                data: {
                    "param": $.toJSON($scope.user)
                },
                success: function(data, status) {
                    var rstate = data.result;
                    if (rstate == '0') {
                        alert('保存成功');
                        $scope.user = '';
                    }
                },
                error: function(data, status, e) {
                    alert(e);
                }
            })
        }
    }])
