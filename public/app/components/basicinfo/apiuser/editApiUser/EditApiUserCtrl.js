angular.module('EditApiUserCtrl', [])
	.controller('EditApiUserCtrl',['$scope', '$routeParams', function($scope, $routeParams) {
		$scope.userList = [
            {
                "code": "1",
                "value": "电信外部"
            },{
                "code": "0",
                "value": "电信内部"
            }
        ]
        var id = $routeParams.id;
        $.ajax({
            type: 'get',
            url: "http://192.168.1.99:8989/dxjf/console/apiuser/query/" + id,
            async: false,
            contentType: "application/x-www-form-urlencoded; charset=gbk",
            data: {
                "id": id
            },
            dataType: 'json',
            success: function(data, status) {
                var rstate = data.result;
                alert(rstate);
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
            if (Util.strIsEmpty($scope.user.userCode)) {
                alert("用户编号不能为空!");
                return;
            }
            if (Util.strIsEmpty($scope.user.userType)) {
                alert("用户类型不能为空!");
                return;
            }
            if (Util.strIsEmpty($scope.user.userRemark)) {
                alert("备注不能为空!");
                return;
            }
            $.ajax({
                type: 'get',
                url: 'http://192.168.1.99:8989/dxjf/console/apiuser/save',
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