angular.module('AreaChangeCtrl', [])
	.controller('AreaChangeCtrl', function($scope, $window) {
		$scope.checked = true;
		$.ajax({
			type: "get",
			url: "http://192.168.1.99:8989/dxjf/basicdata/standard",
			async: false,
			contentType: "application/x-www-form-urlencoded; charset=gbk",
			dataType:'json',
			success: function(data) {
				var rstate = data.result;
				if(rstate == '0') {
					$scope.scoreList = data.message.list;
				}else{
					alert(data.error)
				};
			},
			error: function(data, status, e) {
				alert(e);
			}
		});
		

		
		$scope.submit = function(i) {
			var areacode = $scope.scoreList[i].AREA_CODE;
			var ss = $scope.scoreList[i].STANDARD;
			$.ajax({
				type:"get",
				url: "http://192.168.1.99:8989/dxjf/basicdata/setstandard?areacode="+areacode+"&stand="+ss,
				async: true,
				contentType: "application/x-www-form-urlencoded; charset=gbk",
				dataType:'json',
				success: function(data, result) {
					var rstate = data.result;
					if(rstate == '0') {
						alert('修改成功');
						$window.location.reload();
					}
				},
				error: function(data, status, e) {
					alert(e);
				}
			})
		};
	})