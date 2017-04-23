var mod = angular.module('restaurant')

mod.component('restaurantList', {
    templateUrl: 'restaurant/restaurant-list.html',
    controller: ['$routeParams', '$scope', 'Restaurant',
      function RestaurantListController($routeParams, $scope, Restaurant) {
        this.restaurants = Restaurant.query();
      }
    ]
  });


