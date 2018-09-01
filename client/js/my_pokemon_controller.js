app.controller('my_pokemon_controller', function ($scope, $http, $location) {
    
    $scope.pokemons = [];
    $scope.noPokemonsFlag = false;
    $scope.currentPage = 1;
    $scope.maxPage = 1;
    $scope.tab = 2;

    $scope.init = function () {
        $scope.currentPage = parseInt($location.search()['pageNum'] ? $location.search()['pageNum'] : 1);
        $scope.getPokemons($scope.currentPage);
    };

    $scope.getPokemons = function (page) {
       
        var myPokemons = JSON.parse(localStorage.getItem("myPokemons"));

        if(myPokemons != null) {
            myPokemons.forEach(function(value, i, array){
                array[i].url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + value.id + ".png";
            });
            
            $scope.pokemons = myPokemons.slice((page - 1) * 20, (page - 1) * 20 + 20);
            $scope.maxPage = Math.ceil(myPokemons.length / 20);
        } else {
            $scope.currentPage = 1;
            $scope.maxPage = 1;
            $scope.pokemons = [];
            setNoPokemonsFlag();
        }
    }

    $scope.init();

    $scope.isSet = function (tabNum) {
        return $scope.tab === tabNum;
    };

    $scope.first = function(){
        $scope.currentPage = 1;
        $location.search({pageNum:$scope.currentPage});
    }

    $scope.last = function(){
        $scope.currentPage = $scope.maxPage;
        $location.search({pageNum:$scope.currentPage});
    }

    $scope.previous = function(){
        if($scope.currentPage > 1){
            $scope.currentPage -= 1;
            $location.search({pageNum:$scope.currentPage});
        }
    }

    $scope.middle = function() {
        if($scope.currentPage == 1 && $scope.currentPage < $scope.maxPage){
            $scope.currentPage += 1;
            $location.search({pageNum:$scope.currentPage});
            return;
        }

        if($scope.currentPage == $scope.maxPage && $scope.currentPage > 1){
            $scope.currentPage -= 1;
            $location.search({pageNum:$scope.currentPage});
            return;
        }
    }

    $scope.nextS = function(){
        if($scope.currentPage < $scope.maxPage){
            if($scope.currentPage == 1 && $scope.maxPage > 2)
                $scope.currentPage += 2;
            else
            $scope.currentPage += 1;
            $location.search({pageNum:$scope.currentPage});
        }
    }

    $scope.next = function(){
        if($scope.currentPage < $scope.maxPage){
            $scope.currentPage += 1;
            $location.search({pageNum:$scope.currentPage});
        }
    }

    function setNoPokemonsFlag() {
        if ($scope.pokemons.length == 0) {
            $scope.noPokemonsFlag = true;
        }
        else {
            $scope.noPokemonsFlag = false;
        }
    }
});

