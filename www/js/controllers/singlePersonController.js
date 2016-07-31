angular.module('meosApp')
    .controller('singlePersonController', function($rootScope, $scope) {
            var singlePersonCtrl = this;
            singlePersonCtrl.person = $rootScope.selectedPerson;
    })
    .controller('singleVehicleController', function($rootScope, $scope) {
            var singleVehicleCtrl = this;
            singleVehicleCtrl.vehicle = $rootScope.selectedVehicle;
            console.log(singleVehicleCtrl.vehicle);
    });