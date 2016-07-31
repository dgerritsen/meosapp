angular.module('meosApp')
    .controller('vehicleController', function($rootScope, $state, $http, localStorageService) {
            var vehicleCtrl = this;

            vehicleCtrl.searchLicense = function() {
                $rootScope.savedVehicle = undefined;
                $rootScope.license = _.toUpper(vehicleCtrl.license);
                $state.go('resultsVehicle.ib');
            };

            var fileInput = document.getElementById('FileInput');
            if(fileInput) {
                fileInput.addEventListener("change", function() {

                    vehicleCtrl.loading = true;

                    var formData = new FormData();
                    formData.append('image', fileInput.files[0]);

                    $http({
                        method: 'POST',
                        url: 'https://api.openalpr.com/v1/recognize',
                        params: {
                            tasks: 'plate',
                            country: 'eu',
                            state: 'nl',
                            secret_key: 'sk_a98d951312fe1fadf8ee7cae',
                            return_image: false,
                            topn: 4
                        },
                        transformRequest: function() {
                            return formData;
                        },
                        headers: { 'Content-Type': undefined }
                    }).then(function(result) {
                        if(result.data.plate.results.length > 0) {
                            console.log('License plate read:' + result.data.plate.results[0].plate);
                            vehicleCtrl.result = result.data.plate.results[0].plate;
                            $rootScope.savedVehicle = undefined;
                            $rootScope.license = _.toUpper(result.data.plate.results[0].plate);

                            var addToHistory = {
                                type: 'Kenteken',
                                icon: 'scannable',
                                category: 'vehicle',
                                datetime: new Date(),
                                string: $rootScope.license
                            };
                            var history = localStorageService.get('history');
                            if(history) {
                                history = _.concat(history, addToHistory);
                                localStorageService.set('history', history);
                            } else {
                                localStorageService.set('history', [addToHistory]);
                            }

                            $state.go('resultsVehicle.ib');
                        } else {
                            vehicleCtrl.error = 'Geen kentekenplaat gevonden, maak een nieuwe scan.';
                        }
                        vehicleCtrl.loading = false;
                    });
                });
            }

    })
    .controller('resultsVehicleController', function($rootScope, $state, Restangular, localStorageService) {
            var resultsVehicleCtrl = this;

            if(!$rootScope.savedVehicle) {
                resultsVehicleCtrl.loaded = false;

                if($rootScope.license) {
                    if(localStorageService.get('token')) {
                        Restangular.setDefaultHeaders({ Authorization: 'Token ' + localStorageService.get('token') });
                    }
                    Restangular.all('vehicles').getList().then(function(vehicles) {
                        resultsVehicleCtrl.vehicles = [];
                        resultsVehicleCtrl.signals = [];
                        _.forEach(vehicles, function(value) {
                            var cleansearch = _.toLower(_.trim(value.license));
                            var cleanroot = _.toLower(_.trim($rootScope.license));
                            if(_.startsWith(cleansearch, cleanroot)) {
                                resultsVehicleCtrl.vehicles[resultsVehicleCtrl.vehicles.length] = value;
                                if(value.signals.length > 0) {
                                    resultsVehicleCtrl.personAlert = true;
                                }
                            }
                        });

                        $rootScope.savedVehicle = resultsVehicleCtrl.vehicle;
                        resultsVehicleCtrl.loaded = true;
                    });

                    var addToHistory = {
                        type: 'Kenteken',
                        icon: 'searchable',
                        category: 'vehicle',
                        datetime: new Date(),
                        string: $rootScope.license
                    };

                    var history = localStorageService.get('history');
                    if(history) {
                        history = _.concat(history, addToHistory);
                        localStorageService.set('history', history);
                    } else {
                        localStorageService.set('history', [addToHistory]);
                    }
                }
            } else {
                resultsVehicleCtrl.vehicle = $rootScope.savedVehicle;
                resultsVehicleCtrl.loaded = true;
            }

            resultsVehicleCtrl.select = function(vehicle) {
                $rootScope.selectedVehicle = vehicle;
                $state.go('resultsVehicle.vehicle');
            }
    });