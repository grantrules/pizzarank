var mod = angular.module('user');

mod.component('loginForm', {
    bindings: {
        email: '=',
        password: '=',
    },
    require: {
        //resCtrl: '^restaurantDetail'
    },
    transclude: true,
    templateUrl: 'user/login.html',
    controller: ['$scope', 'LoginForm', function LoginFormController($scope, LoginForm) {
        $scope.email = 'Email@address.com';
        $scope.password = "";
        $scope.submit = function() {
            LoginForm.login($scope.email, $scope.password);

        }
    }]
    
});


mod.service('LoginForm', ['$http', 'authManager', 'User', function($http, authManager, User) {
    return {
        login: function(email,pass) {
            // separate into user model?
            $http.post('/api/users/login', {'email': email, 'password': pass }).
                then(
                    User.processLoginResult,
                    function(err){alert(err);}
                );
            
        }
    }
    
}]);