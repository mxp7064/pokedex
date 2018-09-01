app.controller('pokedex_controller', function ($scope, $http, $location) {
    
    $scope.pokemons = [];
    $scope.noPokemonsFlag = false;
    $scope.currentPage = 1;
    $scope.maxPage = 1;
    $scope.tab = 1;

    $scope.init = function () {
        $scope.currentPage = parseInt($location.search()['pageNum'] ? $location.search()['pageNum'] : 1);
        $scope.getPokemons($scope.currentPage);
    };

    $scope.getPokemons = function (page) {
       
        $scope.loadingFlag = true;
        $http.get('https://pokeapi.co/api/v2/pokemon/', {
            params: {
                limit: 20,
                offset: (page - 1) * 20
            }
        }).then(function (res) {
           
            res.data.results.forEach(function(value, i, array){
                var arr = value.url.split("/");
                var id = arr[arr.length - 2];
                array[i].url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id + ".png";
                array[i].id = id;
            });
            
            $scope.pokemons = res.data.results;
            $scope.maxPage = Math.ceil(res.data.count / 20);
             
            setNoPokemonsFlag();
            $scope.loadingFlag = false; 

        }, function () {
            $scope.loadingFlag = false;
            alert("Something went wrong");
        });
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

