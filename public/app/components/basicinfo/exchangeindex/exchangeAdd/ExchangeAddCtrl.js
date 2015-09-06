angular.module('ExchangeAddCtrl', [])
	.controller('ExchangeAddCtrl', function($scope) {
		$scope.submit = function() {
			if (Util.strIsEmpty($scope.dicts.sortNo)) {
                alert("用户编号不能为空!");
                return;
            }
            if (Util.strIsEmpty($scope.dicts.dictLable)) {
                alert("用户类型不能为空!");
                return;
            }
            if (Util.strIsEmpty($scope.dicts.dictCode)) {
                alert("备注不能为空!");
                return;
            }
			$.ajax({
				type: 'get',
				url: 'http://192.168.1.99:8989/dxjf/console/exchange/save',
				async: false,
				contentType: "application/x-www-form-urlencoded; charset=gbk",
				data:{
					"param": $.toJSON($scope.dicts)
				},
				success: function(data, status) {
					var rstate = data.result;
					if(rstate == '0') {
						alert('保存成功');
						$scope.dicts = '';
					}
				},
				error: function(data, status, e) {
					alert(e);
				}
			})
		}
	})