angular.module('meosApp')
    .controller('authController', function($scope, $http, $state, localStorageService, Restangular) {
            var authCtrl = this;

            authCtrl.submit = function() {
                $http.post('https://meosprod.herokuapp.com/api-token-auth/', { username: authCtrl.username, password: authCtrl.password }).then(function(response) {
                    // Succes
                    localStorageService.set('token', response.data.token);
                    Restangular.setDefaultHeaders({ Authorization: 'Token ' + response.data.token });
                    $state.go('main');
                }, function(response) {
                    // Error
                    if(response.data) {
                        authCtrl.errors = response.data;
                    }
                });
            }
    });