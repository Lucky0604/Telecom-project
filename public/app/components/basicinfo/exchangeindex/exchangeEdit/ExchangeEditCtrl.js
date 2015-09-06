angular.module('ExchangeEditCtrl', [])
	.controller('ExchangeEditCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
		var id = $routeParams.id;
        
        $.ajax({
            type: 'get',
            url: "http://192.168.1.99:8989/dxjf/console/exchange/query/" + id,
            async: false,
            contentType: "application/x-www-form-urlencoded; charset=gbk",
            data: {
                "id": id
            },
            dataType: 'json',
            success: function(data, status) {
                var rstate = data.result;
                if (rstate == '0') {
                    $scope.dict = data.message.user;
                } else {
                    alert(data.error);
                }
            },
            error: function(data, status, e) {
                alert(e);
            }
        });
        $scope.submit = function() {
            if (Util.strIsEmpty($scope.dict.sortNo)) {
                alert("用户编号不能为空!");
                return;
            }
            if (Util.strIsEmpty($scope.dict.dictLable)) {
                alert("用户类型不能为空!");
                return;
            }
            if (Util.strIsEmpty($scope.dict.dictCode)) {
                alert("备注不能为空!");
                return;
            }
            $.ajax({
                type: 'get',
                url: 'http://192.168.1.99:8989/dxjf/console/exchange/save',
                async: false,
                contentType: "application/x-www-form-urlencoded; charset=gbk",
                data: {
                    "param": $.toJSON($scope.dict)
                },
                success: function(data, status) {
                    var rstate = data.result;
                    if (rstate == '0') {
                        alert('保存成功');
                        $scope.dict = '';
                    }
                },
                error: function(data, status, e) {
                    alert(e);
                }
            })
        }
	}])