var app = angular.module('app',[]);
app.controller('AppCtrl', ['$scope', '$http', function($scope, $http){
	$scope.contact = {};
	$scope.button_action = {add: false};
	console.log("Hello world from controller");
	
	$scope.refresh = function(){
		$http.get('/contactlist').success(	function(response){
			console.log("I got the data I requested");
			$scope.person = response;
			$scope.contact = '';
		});
	};	
	
	$scope.refresh();
	
	$scope.addContact = function(){
		console.log($scope.contact);
		$http.post('/contactlist', $scope.contact).success(function(response){
			console.log(response);
			$scope.refresh();
		});
	};
	
	$scope.remove = function(id){
		console.log(id);
		$http.delete('/contactlist/' + id).success(function(response){
			$scope.refresh();
		});
	};
	
	$scope.edit = function(id){
		$scope.button_action.add = true;
		$http.get('/contactlist/' + id).success(function(response){
			$scope.contact = response;
		})
	};
	
	$scope.update = function(){
		console.log($scope.contact._id);
		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response){
			$scope.refresh();
		});
	};
	
	$scope.clear = function(){
		$scope.contact = '';
		$scope.button_action.add = false;
	};
	
}]);