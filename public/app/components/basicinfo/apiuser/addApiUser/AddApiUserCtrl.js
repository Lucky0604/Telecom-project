angular.module('AddApiUserCtrl', [])
	.controller('AddApiUserCtrl', function($scope) {
		$scope.userList = [
			{
				"code": "1",
				"value": "电信外部"
			},{
				"code": "0",
				"value": "电信内部"
			}
		];
		$scope.muserList = [
			{
				"mcode": "0",
				"mvalue": "正常"
			},{
				"mcode": "1",
				"mvalue": "冻结"
			},{
				"mcode": "9",
				"mvalue": "测试"
			}
		]
		$scope.submit = function() {
			if (Util.strIsEmpty($scope.users.userCode)) {
                alert("用户编号不能为空!");
                return;
            }
            if (Util.strIsEmpty($scope.users.userPass)) {
                alert("用户密码不能为空!");
                return;
            }
            if (Util.strIsEmpty($scope.users.userType)) {
                alert("用户类型不能为空!");
                return;
            }
            if (Util.strIsEmpty($scope.users.userRemark)) {
                alert("备注不能为空!");
                return;
            }
            if (Util.strIsEmpty($scope.users.enabled)) {
                alert("接口状态不能为空!");
                return;
            }
			$.ajax({
				type: 'get',
				url: 'http://192.168.1.99:8989/dxjf/console/apiuser/save',
				async: false,
				contentType: "application/x-www-form-urlencoded; charset=gbk",
				data:{
					"param": $.toJSON($scope.users)
				},
				success: function(data, status) {
					var rstate = data.result;
					if(rstate == '0') {
						alert('保存成功');
						$scope.users = '';
					}
				},
				error: function(data, status, e) {
					alert(e);
				}
			})
		}
	})
