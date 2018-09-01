app.controller('pokemon_detail_controller', function ($scope, $http, $routeParams, $window) {
    $scope.id = $routeParams.id;
    $scope.pokemon;
    $scope.isMyPokemon = false;
    
    $scope.init = function () {
        $scope.getPokemon();
    };

    $scope.go_back = function() { 
        $window.history.back();
      };

    $scope.addToMyPokemon = function() {
        var myPokemons = JSON.parse(localStorage.getItem("myPokemons"));
        if (myPokemons != null)
            myPokemons.push({ "id": $scope.id, "name": $scope.pokemon.name });
        else {
            myPokemons = [ { "id": $scope.id, "name": $scope.pokemon.name } ];
        }
        $scope.isMyPokemon = true;
        localStorage.setItem("myPokemons", JSON.stringify(myPokemons));
    }

    $scope.removeFromMyPokemon = function() {
        var myPokemons = JSON.parse(localStorage.getItem("myPokemons"));
       
        var removeIndex = myPokemons.map(function(p) { return p.id; }).indexOf($scope.id);
        myPokemons.splice(removeIndex, 1);

        $scope.isMyPokemon = false;
        localStorage.setItem("myPokemons", JSON.stringify(myPokemons));
    }

    $scope.getPokemon = function () {
        $scope.loadingFlag = true;
        $http.get('https://pokeapi.co/api/v2/pokemon/' + $scope.id)
        .then(function (res) {
            $scope.pokemon = res.data;
            
            var myPokemons = JSON.parse(localStorage.getItem("myPokemons"));
            if(myPokemons != null && myPokemons.map(function(p) { return p.id; }).indexOf($scope.id) != -1) {
                $scope.isMyPokemon = true;
            } 

            $scope.loadingFlag = false; 

        }, function () {
            alert("Something went wrong");
            $scope.loadingFlag = true; 
        });
    }

    $scope.$on('myaccordion:expand', function (e, index) {
        $scope.pokemon.moves[index].move.loaded = false;

        $http.get($scope.pokemon.moves[index].move.url)
        .then(function (res) {
            $scope.pokemon.moves[index].move.data = res.data;
            $scope.pokemon.moves[index].move.loaded = true;
           
            document.getElementById("toggle-" + index).children[1].getElementsByClassName("toggle-body")[0].style.maxHeight = "none";
        }, function () {
            alert("Something went wrong");
        });
    });

    $scope.init();
});