var mod = angular.module('home', [
    'ngRoute',
]);

mod.component('home', {
    transclude: true,
    templateUrl: 'home.html',
    /*
    controller: ['$routeParams', '$scope', 'Restaurant',
      function RestaurantDetailController($routeParams, $scope, Restaurant) {
          var self = this;
          self.restaurant = Restaurant.get({id: $routeParams.restaurant_id});
          this.getRestaurant = function(){return self.restaurant };
      }
    ]*/
});