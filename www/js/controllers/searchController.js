angular.module('meosApp')
    .controller('searchController', function($rootScope, $scope, $state) {
            var searchCtrl = this;
            $rootScope.selectedPerson = undefined;
            $rootScope.selectedVehicle = undefined;

            searchCtrl.search = function() {
                $rootScope.savedSearchResults = undefined;
                $state.go('results.ib');
            };

            $scope.$watch(angular.bind(this, function() {
                return this.keno;
            }), function(newVal) {
                $rootScope.keno = _.toLower(_.trim(newVal));
            })
    });