angular.module('pizzarankApp', [
    'ngRoute',
    /*
    'restaurantList',
    'restaurantDetail',*/
    'restaurant',
    'user',
    'ui.bootstrap',
    'angular-jwt',
    'ui.validate',
])

.config(['$locationProvider' ,'$routeProvider', '$httpProvider', 'jwtOptionsProvider',  
    function config($locationProvider, $routeProvider, $httpProvider, jwtOptionsProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/home', {
          templateUrl: 'home.html'
        }).
        when('/restaurants', {
          template: '<restaurant-list></restaurant-list>'
        }).
        when('/restaurant/:restaurant_slug', {
          template: '<restaurant-detail></restaurant-detail>'
        }).
        when('/b/:borough', {
          template: '<restaurant-list borough="$borough"></restaurant-list>'
        }).
        when('/profile/:user_id', {
          template: '<profile></profile>'
        }).
        when('/register', {
          template: '<register-form></register-form>'
        }).
        otherwise('/home');
        
        
        // jwt middleware
        jwtOptionsProvider.config({
            authPrefix: "JWT ",
          tokenGetter: function() {
            return localStorage.getItem('id_token');
          }
        });

        $httpProvider.interceptors.push('jwtInterceptor');
    }
  ]);

angular
  .module('pizzarankApp')
  .run(['authManager', function(authManager) {

    authManager.checkAuthOnRefresh();

  }]);
  