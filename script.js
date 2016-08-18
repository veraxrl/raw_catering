var app = angular.module('rawApp', ["ngRoute","firebase","youtube-embed"]); 
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

app.controller('mainCtrl', function($scope, $http, $firebaseArray, $firebaseObject, $firebaseAuth, $location, $routeParams, $route) {

    //Automatic SlideShow:
    $scope.slideIndex = 0;

    $scope.carousel = function() {
        var i;
        var x = document.getElementsByClassName("mySlides");
        for (i = 0; i < x.length; i++) {
          x[i].style.display = "none"; 
        }
        $scope.slideIndex=$scope.slideIndex+1;
        if ($scope.slideIndex > x.length) {$scope.slideIndex = 1} 
        x[$scope.slideIndex-1].style.display = "block"; 
        setTimeout($scope.carousel, 3000); // Change image every 2 seconds
    }

    $scope.carousel();

    //Click-through Slideshow:

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
    
    //Jump Navigation:

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
    header1.onclick = function() {
        header1.classList.remove('isVisible');
        shadow1.classList.remove('isVisible');
    }
    header2.onclick = function() {
        header2.classList.remove('isVisible');
        shadow2.classList.remove('isVisible');
    }
    header3.onclick = function() {
        header3.classList.remove('isVisible');
        shadow3.classList.remove('isVisible');
    }

    //Instagram feed: 
      $scope.hasToken = true;
        var token = window.location.hash;
        console.log(token);
      if (!token) {
        $scope.hasToken = false;
      }
      token = token.split("=")[1];

    //Media query: 
    var mq = window.matchMedia( "(min-width: 1400px)" );
    var mq2 = window.matchMedia( "(min-width: 1250px)" );
    var mq3 = window.matchMedia( "(min-width: 1050px)" );
    var mq4 = window.matchMedia( "(min-width: 850px)" ); 
    var mq5 = window.matchMedia( "(min-width: 650px)" ); 
    if (mq.matches && mq2.matches && mq3.matches && mq4.matches && mq5.matches) {
        console.log("larger than 1400");
        $scope.instaNum=14;
    } 
    else if (!mq.matches && mq2.matches && mq3.matches && mq4.matches && mq5.matches) {
        console.log("1250-1400");
        $scope.instaNum=12;
    }
    else if (!mq.matches && !mq2.matches && mq3.matches && mq4.matches && mq5.matches) {
        console.log("1050-1250");
        $scope.instaNum=10;
    } 
    else if (!mq.matches && !mq2.matches && !mq3.matches && mq4.matches && mq5.matches) {
        console.log("850-1050")
        $scope.instaNum=8;
    }
    else if (!mq.matches && !mq2.matches && !mq3.matches && !mq4.matches && mq5.matches) {
        console.log("<850")
        $scope.instaNum=6;
    }
    else if (!mq.matches && !mq2.matches && !mq3.matches && !mq4.matches && !mq5.matches) {
        console.log("<650")
        $scope.instaNum=4;
    }



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
          $scope.picArray = response.data.data.slice(0,$scope.instaNum);
          // console.log(response);
          // now analyze the sentiments and do some other analysis
          // on your images

      })
    };

    $scope.getInstaPics();

    // Google Map API
    var map;
    $scope.initMap=function() {
        console.log(document.getElementById('map'));
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.906, lng: 18.418},
          zoom: 18
        });
    console.log(map);
    }
    $scope.initMap();

    //Youtube API:
    $scope.playTrack = function() {
        console.log("load youtube track");
        $scope.showYT=true;
        $scope.anotherGoodOne = 'https://youtu.be/kO2uAS2V7BE';
    }

    $scope.toggleYT = function() {
        $scope.showYT=false;
    }

    //Auto play:
    // $scope.$on('youtube.player.ready',function($event,player) {
    //     console.log("stopped");
    // });

    /* make the API call to get permanent access token */
    // $scope.httpGetAsync = function (theUrl, callback)
    // {
    //     var xmlHttp = new XMLHttpRequest();
    //     xmlHttp.onreadystatechange = function() { 
    //         if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
    //             callback(xmlHttp.responseText);
    //     }
    //     xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    //     xmlHttp.send(null);
    // }

    // var theUrl='https://graph.facebook.com/v2.2/oauth/access_token?grant_type=fb_exchange_token&client_id={1775390709409158}&client_secret={b04fbaa611e7e1b3e98846527e2accbd}&fb_exchange_token={EAACEdEose0cBAJuLlNEKGrNgdZAaxyQQ6T2FYpW2GpH9pZAXOVXe7NlrfcoICASJ6XZCBjlA5nvUEKvAdEQaZC0qlZAQEZAQJWDghNZAX45QpoowQBgm6vIK3lioSHPLDMBlvjcZBHT8f2GImzAixcbWa7dvgXTUYRlBc3EIHMceXgZDZD}';
    // $scope.httpGetAsync(theUrl,"http://localhost:8000/#/");

    // Facebook API call to get information
    if (typeof(FB) != 'undefined' && FB != null ) {
        FB.api('me?fields=ratings', 'get', { access_token: 'EAACEdEose0cBAOYNSzx5jRvABjH2nOIrfLkC8Wou46ZCQWe4ZAoXZCzzczbnwOgMk8ISHHc8iyJYkSLEBZA4t5cFir7H0et2LVlsZBaeZBwtHBhfIT2WFwCnDfawCXoETI3V6ZCXANlyZChCZC1ajH1yVRUnRphNvdrY7jlhqZCGU89AZDZD' }, function(response) {
          console.log(response);
          $scope.reviews= response.ratings.data;
        });
    } else {
        console.log("FB is not defined dummy");
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