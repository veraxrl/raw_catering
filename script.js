var app = angular.module('rawApp', ["ngRoute","firebase"]); 
var INSTA_API_BASE_URL = "https://api.instagram.com/v1";

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

app.controller('mainCtrl', function($scope, $http, $routeParams, $firebaseObject, $firebaseAuth) {

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
    var slide1 = document.getElementById("slide1-btn");
    var slide2 = document.getElementById("slide2-btn");
    var slide3 = document.getElementById("slide3-btn");

    var header1 = document.getElementById("slide1");
    var header2 = document.getElementById("slide2");
    var header3 = document.getElementById("slide3");
    var shadow1 = document.getElementById("slide-overlay1");
    var shadow2 = document.getElementById("slide-overlay2");
    var shadow3 = document.getElementById("slide-overlay3");
    
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

    slide1.onclick = function() {
        header1.classList.add('isVisible');
        shadow1.classList.add('isVisible');
    };
    slide2.onclick = function() {
        header2.classList.add('isVisible');
        shadow2.classList.add('isVisible');
    }
    slide3.onclick = function() {
        header3.classList.add('isVisible');
        shadow3.classList.add('isVisible');
    }

    //Instagram feed: 
      $scope.hasToken = true;
        var token = window.location.hash;
        console.log(token);
      if (!token) {
        $scope.hasToken = false;
      }
      token = token.split("=")[1];

      $scope.getInstaPics = function() {
          var path = "/users/self/media/recent";
          var mediaUrl = INSTA_API_BASE_URL + path;
          $http({
            method: "JSONP",
            url: mediaUrl,
            params: {
                callback: "JSON_CALLBACK",
                access_token:"2272162770.ac9da07.498560a0b94542af86af531265697001"
            }
        }).then(function(response) {
          $scope.picArray = response.data.data.slice(0,15);
          console.log(response);
          // now analyze the sentiments and do some other analysis
          // on your images

      })
    };

    $scope.getInstaPics();

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