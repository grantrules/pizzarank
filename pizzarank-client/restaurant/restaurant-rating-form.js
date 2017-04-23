var mod = angular.module('restaurant');

mod.component('restaurantRatingForm', {
    bindings: {
        title: '=',
        body: '=',
        rating: '=',
    },
    require: {
        resCtrl: '^restaurantDetail'
    },
    transclude: true,
    templateUrl: 'restaurant/restaurant-rating-form.html',
    controller: ['$scope', 'RatingForm', function RatingFormController($scope, RatingForm) {
        $scope.title = 'Enter title';
        $scope.body = "Write your review";
        $scope.rating = 0;
        $scope.submit = function() {
            RatingForm.save(this.$ctrl.resCtrl.restaurant._id, {
                title: $scope.title,
                body: $scope.body,
                rating: $scope.rating
            });

        }
    }]
    
});


mod.service('RatingForm', ['$http', 'Rating', function($http, Rating) {
    return {
        save: function(id, rating) {
            Rating.create({id:id}, rating);
        }
    }
    
}]);