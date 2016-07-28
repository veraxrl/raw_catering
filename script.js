var app = angular.module('rawApp', ["ngRoute","firebase","youtube-embed"]); 

app.config(function($routeProvider) {
	$routeProvider.when('/', {
		controller: 'mainCtrl',
		templateUrl: 'templates/home.html'
	}).when('/login', {
		controller: 'loginCtrl',
		templateUrl: 'templates/login.html'
	})                                    
});

app.controller('mainCtrl', function($scope, $routeParams, $firebaseObject, $firebaseAuth) {

    $scope.slideIndex = 1;

    $scope.plusDivs = function(n) {
        $scope.showDivs($scope.slideIndex += n);
    }

    $scope.showDivs= function(n) {
        var i;
        var x = document.getElementsByClassName("mySlides");
        if (n > x.length) {$scope.slideIndex = 1} 
        if (n < 1) {$scope.slideIndex = x.length} ;
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none"; 
        }
        x[$scope.slideIndex-1].style.display = "block"; 
    }
    
    $scope.showDivs($scope.slideIndex);
    
    mission.onclick = function() {
        console.log("mission");
    }
    team.onclick = function() {
        console.log("team");
    }

});