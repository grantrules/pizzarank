var mod = angular.module('restaurant', ['ngResource', 'ngRoute']);

mod.factory('Restaurant', ['$resource',
    function($resource) {
      return $resource('/api/restaurants/restaurants/:slug', {}, {
        query: {
            method: 'GET',
            isArray: true,
        }
      });
    }
  ]);

mod.factory('Rating', ['$resource',
   function($resource) {
       return $resource('/api/restaurants/ratings/:id', {}, {
           'create': {
               method: 'POST',
           }
       });
   }

]);

mod.controller('SearchCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){
    
    $scope.getRestaurants = function(val) {
        return $http.get('/api/restaurants/restaurantsearch', {
              params: {
              name: val
            }
        }).then(function(response){
            // maybe we can send the full array of json items then pull the name property out in the template
            return response.data;
            /*
            return response.data.map(function(item){
                return item.name;
            });*/
        });
    };
    $scope.onSelect = function($item, $model, $label) {
        $location.path("/restaurant/"+$item.slug)
        console.log($item);
    }
 

}]);