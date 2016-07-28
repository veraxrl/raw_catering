var app = angular.module('rawApp', ["ngRoute","firebase","youtube-embed"]); 

app.config(function($routeProvider) {
	$routeProvider.when('/', {
		controller: 'mainCtrl',
		templateUrl: 'templates/home.html'
	}).when('/services/menus', {
		controller: 'menusCtrl',
		templateUrl: 'templates/menus.html'
	}).when('/services/clients', {
        controller: 'clientsCtrl',
        templateUrl: 'templates/clients.html'
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

    var mission = document.getElementById("to-mission");
    var team = document.getElementById("to-team");
    var gallery = document.getElementById("to-gallery");
    var service = document.getElementById("to-service");
    
    mission.onclick = function() {
        console.log("mission");
        document.body.scrollTop=650;
    }
    team.onclick = function() {
        console.log("team");
        document.body.scrollTop=1100;
    }
    gallery.onclick = function() {
        document.body.scrollTop=2000;
    }
    service.onclick = function() {
        document.body.scrollTop=1420;
    }

});

app.controller('menusCtrl', function($scope, $routeParams, $firebaseObject, $firebaseAuth) {
    $scope.authObj = $firebaseAuth();

    $scope.login = function() {
        console.log($scope.email);
        console.log($scope.password);

        $scope.authObj.$signInWithEmailAndPassword($scope.email, $scope.password)
        .then(function(firebaseUser) {
            console.log("Signed in as:", firebaseUser.uid);
            window.location.assign('http://localhost:8000/#/users/'+firebaseUser.uid);

        }).catch(function(error) {
             console.error("Authentication failed:", error);
        })

    }
});

app.controller('clientsCtrl', function($scope, $routeParams, $firebaseObject, $firebaseAuth) {
    $scope.authObj = $firebaseAuth();

    $scope.login = function() {
        console.log($scope.email);
        console.log($scope.password);

        $scope.authObj.$signInWithEmailAndPassword($scope.email, $scope.password)
        .then(function(firebaseUser) {
            console.log("Signed in as:", firebaseUser.uid);
            window.location.assign('http://localhost:8000/#/users/'+firebaseUser.uid);

        }).catch(function(error) {
             console.error("Authentication failed:", error);
        })

    }
});