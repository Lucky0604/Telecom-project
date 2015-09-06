angular.module('MainCtrl', [])
    .controller('MainCtrl', function($scope) {



        require.config({
            paths: {
                echarts: 'bower_components/echarts/dist'
            }
        });
        // 使用
        require(
            [
                'echarts',
                'echarts/chart/pie', // 使用柱状图就加载pie模块，按需加载
                'echarts/chart/bar'
            ],
            function(ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById('main'));
                var myChart2 = ec.init(document.getElementById('main2'));
                var option = {
                    title: {
                        text: '疆内各地区对比',
                        subtext: '',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },

                    calculable: true
                        //     series: [{
                        //         name: '地区对比',
                        //         type: 'pie',
                        //         radius: '60%',
                        //         center: ['50%', '60%'],
                        //         data: [{
                        //             value: 335,
                        //             name: '昌吉'
                        //         }, {
                        //             value: 310,
                        //             name: '和田'
                        //         }, {
                        //             value: 234,
                        //             name: '伊犁'
                        //         }, {
                        //             value: 135,
                        //             name: '阿克苏'
                        //         }, {
                        //             value: 1548,
                        //             name: '乌鲁木齐'
                        //         }]
                        //     }]

                };
                var series = new Array();
                var oSeries = new Object();
                oSeries.name = '地区对比';
                oSeries.type = 'pie';
                oSeries.radius = '60%';
                oSeries.center = ['50%', '60%'];
                $.ajax({
                    type: 'get',
                    url: 'http://192.168.1.99:8989/dxjf/console/exchlog/querySatThisM',
                    async: false,
                    contentType: 'application/x-www-form-urlencoded; charset=gbk',
                    dataType: 'json',
                    success: function(data, result) {
                        var rstate = data.result;
                        if (rstate == '0') {
                            console.log(data.message.list.length);
                            var oData = new Array();
                            var len = data.message.list.length;

                            for (var i = 0; i < len; i++) {
                                var obj = new Object();
                                obj.value = data.message.list[i].SUMJF;
                                obj.name = data.message.list[i].CITY_NAME;
                                oData.push(obj);
                            }
                            oSeries.data = oData;
                        } else {
                            alert(data.error)
                        }
                    },
                    error: function(data, result, e) {
                        alert(e);
                    }
                })
                series.push(oSeries);
                option.series = series;




                var option2 = {
                    tooltip: {
                        show: true
                    },
                    title: {
                        text: '近六个月兑换数量',
                        x: 'center'
                    },

                    // xAxis : [
                    //     {
                    //         type : 'category',
                    //         data : ["1月","2月","3月","4月","5月","6月"]
                    //     }
                    // ],
                    yAxis: [{
                            type: 'value'
                        }]
                        // series : [
                        //     {
                        //         "name":"对比",
                        //         "type":"bar",
                        //         "data":[5, 20, 40, 10, 10, 20]
                        //     }
                        // ]
                };
                var xAxis = new Array();
                var series = new Array();
                var oXaxis = new Object();
                var mSeries = new Object();
                oXaxis.type = "category";
                mSeries.name = "对比";
                mSeries.type = "bar";
                $.ajax({
                    type: "get",
                    url: "http://192.168.1.99:8989/dxjf/console/exchlog/querySat4M",
                    contentType: "application/x-www-form-urlencoded; charset=gbk",
                    async: false,
                    dataType: "json",
                    success: function(data, result) {
                        var rstate = data.result;
						if(rstate == '0'){
							console.log(data.message.list);
							var oData = new Array();
							var mData = new Array();
							for(var i = 0, len = data.message.list.length; i < len; i ++){
								var obj = new Object();
								var mobj = new Object();
								obj = data.message.list[i].EXCHANGE_TIME;
								mobj = data.message.list[i].SUMJF;
								oData.push(obj);
								mData.push(mobj);
								
							};
							oXaxis.data = oData;
							mSeries.data = mData;
						}else{
							alert(data.error);
						};
                    },
					error: function(data, result, e) {
							alert(e);
						   }
                })
				xAxis.push(oXaxis);
				series.push(mSeries);
				option2.series = series;
				option2.xAxis = xAxis;



                // 为echarts对象加载数据 
                myChart2.setOption(option2);
                // 为echarts对象加载数据 
                myChart.setOption(option);
            }
        );
    })
