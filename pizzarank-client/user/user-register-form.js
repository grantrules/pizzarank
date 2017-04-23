var mod = angular.module('user');

mod.component('registerForm', {
    templateUrl: 'user/register-form.html',
    controller: ['$scope', 'RegisterForm', function RegisterFormController($scope, RegisterForm) {
        $scope.submit = function() {
            RegisterForm.save({
                first_name: $scope.first_name,
                last_name: $scope.last_name,
                email: $scope.email,
                password: $scope.password
            });

        }
    }]
    
});


mod.service('RegisterForm', ['$http', 'User', function($http, User) {
    return {
        save: function(user) {
            User.create(user,function(user){}, function(err){});
        }
    }
    
}]);