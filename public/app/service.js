angular.module('MemberService', [])
	.factory('Member', ['$http', function($http) {
		return {
			//call to get all members
			get: function() {
				return $http.get('/api/members');
			},
			
			//these will work when more API routes are defined on the Node side of things
			put: function(id) {
				return $http.get('/api/members' + id);
			},
			//call to POST and create a new member
			create: function(memberData) {
				return $http.post('/api/members', memberData);
			},
			
			//call to DELETE a member
			delete: function(id) {
				return $http.delete('/api/members/' + id);
			}
			
		}
	}]);