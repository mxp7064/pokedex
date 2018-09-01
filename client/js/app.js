//app angularjs module
var app = angular.module('myApp', ["ngRoute", "ngAccordion"]);

//application configuration
app.config(function ($routeProvider, $locationProvider) {
    //set up routes
    $routeProvider.when("/pokedex", {
        templateUrl: "views/pokedex.html",
        controller: "pokedex_controller"
    }).when("/", {
        templateUrl: "views/pokedex.html",
        controller: "pokedex_controller"
    }).when("/pokemon/:id", {
        templateUrl: "/views/pokemon_detail.html",
        controller: "pokemon_detail_controller"
    }).when("/mypokemon", {
        templateUrl: "/views/my_pokemon.html",
        controller: "my_pokemon_controller"
    });
    
    //remove prefix in route urls
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
});

// Check if image can be loaded - if not - load the default image
app.directive('checkImage', function() {
    return {
       link: function(scope, element, attrs) {
          element.bind('error', function() {
             element.attr('src', 'https://shonnafails.files.wordpress.com/2018/01/pokeball.png?w=100&h=100&crop=1'); // set default image
          });
        }
    }
 });

 // Capitalize filter
 app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});