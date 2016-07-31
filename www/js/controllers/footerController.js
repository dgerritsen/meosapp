angular.module('meosApp')
    .controller('footerController', function($rootScope, $state) {
            var footerCtrl = this;
            footerCtrl.prev = $rootScope.prevState.name;

            switch($state.current.name) {
                case "persons":
                case "vehicles":
                    footerCtrl.prev = 'main';
                break;

                case "search.name":
                case "search.document":
                    footerCtrl.prev = 'persons';
                break;

                case "results.ib":
                case "resultsVehicle.ib":
                    footerCtrl.prev = $rootScope.prevState.name;
                break;

                case "search.license":
                    footerCtrl.prev = 'vehicles';
                break;

                default:
                    footerCtrl.prev = 'main';
                break;
            }

            $rootScope.$watch('selectedPerson', function() {
                footerCtrl.personActive = $rootScope.selectedPerson;
            });

            $rootScope.$watch('selectedVehicle', function() {
                footerCtrl.vehicleActive = $rootScope.selectedVehicle;
            });

    });