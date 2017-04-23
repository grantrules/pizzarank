var mod = angular.module('restaurant');

mod.component('restaurantDetail', {
    transclude: true,
    templateUrl: 'restaurant/restaurant-detail.html',
    controller: ['$routeParams', '$scope', 'Restaurant',
      function RestaurantDetailController($routeParams, $scope, Restaurant) {
          var self = this;
          self.restaurant = Restaurant.get({slug: $routeParams.restaurant_slug});
          this.getRestaurant = function(){return self.restaurant };
      }
    ]
});