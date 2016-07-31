angular.module('meosApp')
        .controller('mainController', function($rootScope, $state, Restangular, localStorageService) {
            var mainCtrl = this;
            mainCtrl.keno = '';


            if(localStorageService.get('token')) {
                Restangular.setDefaultHeaders({ Authorization: 'Token ' + localStorageService.get('token') });
            } else {
                $state.go('login');
            }


        });