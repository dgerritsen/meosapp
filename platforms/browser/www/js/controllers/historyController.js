angular.module('meosApp')
    .controller('historyController', function($rootScope, $state, localStorageService) {
            var historyCtrl = this;

            historyCtrl.history = localStorageService.get('history');

            historyCtrl.search = function(obj) {
                console.log(obj);

                if(obj.category == 'person') {

                    if(obj.type = 'Kenosleutel') {
                        $rootScope.keno = obj.string;
                    }

                    $state.go('results.ib');

                } else if(obj.category == 'vehicle') {
                    if(obj.type = 'Kenteken') {
                        $rootScope.license = obj.string;
                    }
                    $state.go('resultsVehicle.ib');
                }
            }
    });