angular.module('AddUserCtrl', [])
    .controller('AddUserCtrl', function($scope) {

        $scope.sexList = [{
            "code": "1",
            "value": "男士"
        }, {
            "code": "0",
            "value": "女士"
        }];
        $scope.submit = function() {
            if (Util.strIsEmpty($scope.users.username)) {
                alert("用户名不能为空!");
                return;
            }
            if (Util.strIsEmpty($scope.users.useraccount)) {
                alert("用户账号不能为空!");
                return;
            }
            if (Util.strIsEmpty($scope.users.userphone)) {
                alert("用户手机不能为空!");
                return;
            }
            if (Util.strIsEmpty($scope.users.depid)) {
                alert("部门名称不能为空!");
                return;
            }
            if (Util.strIsEmpty($scope.users.password)) {
                alert("用户密码不能为空!");
                return;
            }
            if (Util.strIsEmpty($scope.users.usersex)) {
                alert("性别不能为空!");
                return;
            } else if (!Util.strIsEmpty($scope.users.regtime)) {
                alert("注册时间不能为空!");
                return;
            }
            $.ajax({
                type: 'get',
                url: 'http://192.168.1.99:8989/dxjf/platform/user/save4ang',
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=gbk",
                data: {
                    "param": $.toJSON($scope.users)
                },
                success: function(data, status) {
                    var rstate = data.result;
                    if (rstate == '0') {
                        alert('保存成功');
                        $scope.users = '';
                    }
                },
                error: function(data, status, e) {
                    alert(e);
                }
            })
        }
    });
