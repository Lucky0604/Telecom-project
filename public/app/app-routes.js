angular.module('app-routes', ['ngRoute'])
.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'app/components/index/index.html',
			controller: 'MainCtrl'
		})
		.when('/sinfoshow', {
			templateUrl: 'app/components/infoshow/sinfoshow/sinfoshow.html',
			controller: 'SinfoCtrl'
		})
		.when('/sinfolist', {
			templateUrl: 'app/components/infoshow/sinfolist/sinfolist.html',
			controller: 'SlistCtrl'
		})
		.when('/areachange', {
			templateUrl: 'app/components/basicinfo/areachange/area.html',
			controller: 'AreaChangeCtrl'
		})
		//api user
		.when('/apiuser/list', {
			templateUrl: 'app/components/basicinfo/apiuser/apiUserList/list.html',
			controller: 'ApiUserCtrl'
		})
		.when('/apiuser/addapiuser', {
			templateUrl: 'app/components/basicinfo/apiuser/addApiUser/addApiUser.html',
			controller: 'AddApiUserCtrl'
		})
		.when('/apiuser/editapiuser/:id', {
			templateUrl: 'app/components/basicinfo/apiuser/editApiUser/editApiUser.html',
			controller: 'EditApiUserCtrl'
		})
		//exchange index
		.when('/exchange/exchangelist', {
			templateUrl: 'app/components/basicinfo/exchangeindex/exchangeList/exchangelist.html',
			controller: 'ExchangeListCtrl'
		})
		.when('/exchange/exchangeadd', {
			templateUrl: 'app/components/basicinfo/exchangeindex/exchangeAdd/exchangeAdd.html',
			controller: 'ExchangeAddCtrl'
		})
		.when('/exchange/exchangeedit/:id', {
			templateUrl: 'app/components/basicinfo/exchangeindex/exchangeEdit/exchangeEdit.html',
			controller: 'ExchangeEditCtrl'
		})

		//system user
		.when('/system/userlist', {
			templateUrl: 'app/components/system/systemuser/userlist/userlist.html',
			controller: 'UserlistCtrl'
		})
		.when('/system/adduser', {
			templateUrl: 'app/components/system/systemuser/adduser/adduser.html',
			controller: 'AddUserCtrl'
		})
		.when('/system/user/:id', {
			templateUrl: 'app/components/system/systemuser/useredit/edit.html',
			controller: 'UserEditCtrl'
		})
});









