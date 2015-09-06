angular.module('SinfoCtrl',[])
	.controller('SinfoCtrl', function($scope) {
		$scope.area = [{
			"code":"901",
			"value": "塔城"
		},{
			"code": "902",
			"value": "哈密"
		},{
			"code": "903",
			"value": "和田"
		},{
			"code": "906",
			"value": "阿勒泰"
		},{
			"code": "908",
			"value": "克州"
		},{
			"code": "909",
			"value": "博乐"
		},{
			"code": "990",
			"value": "克拉玛依"
		},{
			"code": "991",
			"value": "乌鲁木齐"
		},{
			"code": "992",
			"value": "奎屯"
		},{
			"code": "993",
			"value": "石河子"
		},{
			"code": "994",
			"value": "昌吉"
		},{
			"code": "995",
			"value": "吐鲁番"
		},{
			"code": "996",
			"value": "巴州"
		},{
			"code": "996",
			"value": "库尔勒"
		},{
			"code": "997",
			"value": "阿克苏"
		},{
			"code": "998",
			"value": "喀什"
		},{
			"code": "999",
			"value": "伊犁"
		}];
		$scope.pageToolCursor = [];
        $scope.itemsPerPage = 0;
        $scope.currentPage = 1;
        $scope.pageSize = 8;
        $scope.storeList;
        $scope.searchValue = "";
        // 初始加载数据
        var datastr = "";
        datastr = "{\"pageNumber\":\"1\",\"pageSize\":\"" + $scope.pageSize + "\",\"param\":\"" + $scope.searchValue + "\"}";
        $.ajax({
            type: 'get',
            url: "http://192.168.1.99:8989/dxjf/console/exchlog/querySatlist",
            async: false,
            contentType: "application/x-www-form-urlencoded; charset=gbk",
            data: {
                "param": datastr
            },
            dataType: 'json',
            success: function(data, status) {
                var rstate = data.result;
                var lists = data.message.list;
                $scope.lists = lists;
                $scope.itemsPerPage = data.message.totalPage;
                // 初始化页码下标
                var itemsNum = 9;
                if ($scope.itemsPerPage < 9) {
                    itemsNum = $scope.itemsPerPage;
                }
                for (i = 1; i <= itemsNum; i++) {
                    $scope.pageToolCursor.push(i);
                }

            },
            error: function(data, status, e) {
                alert('获取数据失败..');
            }
        });

        // 上一页 事件定义
        $scope.prevPage = function() {
            if (!($scope.currentPage == 1)) {
                var reqpages = $scope.currentPage - 1;
                var datastr;
                datastr = "{\"pageNumber\":\"" + reqpages + "\",\"pageSize\":\"" + $scope.pageSize + "\",\"param\":\"" + $scope.searchValue + "\"}";
                $.ajax({
                        type: 'get',
                        async: false,
                        url: "http://192.168.1.99:8989/dxjf/console/exchlog/querySatlist",
                        contentType: "application/x-www-form-urlencoded; charset=gbk",
                        data: {
                            "param": datastr
                        },
                        dataType: 'json',
                        success: function(data, status) {
                            var rstate = data.result;
                            if (rstate == "0") {
                                var lists = data.message.list;
                                $scope.lists = lists;
                                $scope.currentPage = data.message.pageNumber;

                                var pageToolCursor = ($scope.pageToolCursor);
                                if ($scope.currentPage <= pageToolCursor[0]) {
                                    if (pageToolCursor[0] == 1) {
                                        return;
                                    }
                                    var arrayObj = new Array();
                                    if ($scope.currentPage < 9) {
                                        $scope.pageToolCursor = [
                                            '1', '2', '3',
                                            '4', '5', '6',
                                            '7', '8', '9'
                                        ];

                                    } else {
                                        for (i = $scope.currentPage; i > $scope.currentPage - 9; i--) {
                                            arrayObj.unshift(i);
                                        }
                                        $scope.pageToolCursor = arrayObj;
                                    }
                                }
                            } else {
                                alert("获取信息失败!");
                            }
                        },
                        error: function(data, status, e) {
                            alert('获取数据失败..');
                        }
                    });
            }

        };

        // 下一页 事件定义
        $scope.nextPage = function() {
            if (!($scope.currentPage == $scope.itemsPerPage)) {
                var reqpages = $scope.currentPage + 1;
                var datastr;
                datastr = "{\"pageNumber\":\"" + reqpages + "\",\"pageSize\":\"" + $scope.pageSize + "\",\"param\":\"" + $scope.searchValue + "\"}";
                $.ajax({
                        type: 'get',
                        async: false,
                        url: "http://192.168.1.99:8989/dxjf/console/exchlog/querySatlist",
                        contentType: "application/x-www-form-urlencoded; charset=gbk",
                        data: {
                            "param": datastr
                        },
                        dataType: 'json',
                        success: function(data, status) {
                            var rstate = data.result;
                            if (rstate == "0") {
                                var lists = data.message.list;
                                $scope.lists = lists;
                                var pageToolCursor = ($scope.pageToolCursor);
                                if ($scope.currentPage >= pageToolCursor[pageToolCursor.length - 1]) {
                                    if (pageToolCursor[pageToolCursor.length - 1] == $scope.itemsPerPage) {
                                        return;
                                    }
                                    var arrayObj = new Array();
                                    var enditems = 0;
                                    var compareNUm = $scope.itemsPerPage - pageToolCursor[pageToolCursor.length - 1];
                                    if (compareNUm < 9 && compareNUm > 0) {
                                        enditems = $scope.itemsPerPage - pageToolCursor[pageToolCursor.length - 1];
                                        for (i = $scope.currentPage + enditems; i > $scope.currentPage + enditems - 9; i--) {
                                            arrayObj.unshift(i);
                                        }

                                    } else {
                                        enditems = 9;
                                        for (i = $scope.currentPage; i < $scope.currentPage + enditems; i++) {
                                            arrayObj.push(i);
                                        }
                                    }
                                    $scope.pageToolCursor = arrayObj;

                                }
                                $scope.currentPage = data.message.pageNumber;
                            } else {
                                alert("获取信息失败!");
                            }
                        },
                        error: function(data, status, e) {
                            alert('获取数据失败..');
                        }
                    });
            }

        };

        // 首页 事件
        $scope.firstPage = function() {
            var datastr = "";
            datastr = "{\"pageNumber\":\"1\",\"pageSize\":\"" + $scope.pageSize + "\",\"param\":\"" + $scope.searchValue + "\"}";
            $.ajax({
                    type: 'get',
                    url: "http://192.168.1.99:8989/dxjf/console/exchlog/querySatlist",
                    async: false,
                    contentType: "application/x-www-form-urlencoded; charset=gbk",
                    data: {
                        "param": datastr
                    },
                    dataType: 'json',
                    success: function(data, status) {
                        var rstate = data.result;
                        if (rstate == "0") {
                            var lists = data.message.list;
                            $scope.lists = lists;
                            $scope.itemsPerPage = data.message.totalPage;
                            $scope.currentPage = 1;
                            // 初始化页码下标
                            var itemsNum = 9;
                            if ($scope.itemsPerPage < 9) {
                                itemsNum = $scope.itemsPerPage;
                            }
                            var arrayObj = new Array();
                            for (i = 1; i <= itemsNum; i++) {
                                arrayObj.push(i);
                            }
                            $scope.pageToolCursor = arrayObj;
                        } else {
                            alert("获取信息失败!");
                        }
                    },
                    error: function(data, status, e) {
                        alert('获取数据失败..');
                    }
                });
        }

        // 尾页 事件定义
        $scope.lastPage = function() {
            if ($scope.currentPage == $scope.itemsPerPage) {
                return;
            }
            var reqpages = $scope.itemsPerPage;
            var datastr;
            datastr = "{\"pageNumber\":\"" + reqpages + "\",\"pageSize\":\"" + $scope.pageSize + "\",\"param\":\"" + $scope.searchValue + "\"}";

            $.ajax({
                    type: 'get',
                    async: false,
                    url: "http://192.168.1.99:8989/dxjf/console/exchlog/querySatlist",
                    contentType: "application/x-www-form-urlencoded; charset=gbk",
                    data: {
                        "param": datastr
                    },
                    dataType: 'json',
                    success: function(data, status) {
                        var rstate = data.result;
                        if (rstate == "0") {
                            var lists = data.message.list;
                            $scope.lists = lists;
                            $scope.currentPage = $scope.itemsPerPage;

                            var arrayObj = new Array();
                            if ($scope.itemsPerPage > 9) {
                                for (i = $scope.itemsPerPage; i > $scope.itemsPerPage - 9; i--) {
                                    arrayObj.unshift(i);
                                }
                                $scope.pageToolCursor = arrayObj;
                            }
                        } else {
                            alert("获取礼品信息失败!");
                        }
                    },
                    error: function(data, status, e) {
                        alert('获取数据失败..');
                    }
                });
        };

        // 按页面 进入对应页
        $scope.gotoXpage = function(x) {
            if (x > $scope.itemsPerPage) {
                return;
            }
            var reqpages = x;
            var datastr;
            datastr = "{\"pageNumber\":\"" + reqpages + "\",\"pageSize\":\"" + $scope.pageSize + "\",\"param\":\"" + $scope.searchValue + "\"}";
            $.ajax({
                    type: 'get',
                    async: false,
                    url: "http://192.168.1.99:8989/dxjf/console/exchlog/querySatlist",
                    contentType: "application/x-www-form-urlencoded; charset=gbk",
                    data: {
                        "param": datastr
                    },
                    dataType: 'json',
                    success: function(data, status) {

                        var rstate = data.result;
                        if (rstate == "0") {
                            var lists = data.message.list;
                            $scope.lists = lists;
                            $scope.currentPage = data.message.pageNumber;
                        } else {
                            alert("获取信息失败!");
                        }
                    },
                    error: function(data, status, e) {
                        alert('获取数据失败..');
                    }
                });

        };

        // 设置页码 - 当前页 高亮显示
        $scope.pageTool = function(n) {
            var currentPage = $scope.currentPage;
            //alert(currentPage);
            var returStr = "";
     
            if (n == currentPage) {
                returStr = "active-page";

            }
            if (n > $scope.itemsPerPage) {
                returStr = "disabled-page";
            }
            //alert(returStr);
            return returStr

        };
	})