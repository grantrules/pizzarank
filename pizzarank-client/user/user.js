var mod = angular.module('user', [
    'ngRoute',
]);

mod.factory('User', ['$http', '$rootScope', 'authManager',
   function($http, $rootScope, authManager) {
       return {
           /*
           login: function(user, success, error) {
               $http.post('/login', user).success(function(user){
                $rootScope.user = user;
                success(user);
                }).error(error);
           },
           */
           
           create: function(user, success, error) {
               var self = this;
               $http.post('/api/users/users', user).
                then(
                   function(res){self.loginResult(res,success);},
                   function(err){error(err)}
               );
           },
           
           loginResult: function(res, success) {
                localStorage.setItem('id_token', res.data.token);
                localStorage.setItem('user', res.data.user);
                authManager.authenticate();
                success(res.data.user);
           },
           
           logout: function() {
               localStorage.removeItem('id_token');
               localStorage.removeItem('user');
               authManager.unauthenticate();
           },
           
           getCurrentUser: function() {
               return localStorage.getItem('user');
           }
    }}

]);