angular.module('meosApp')
    .controller('resultsController', function($rootScope, $scope, $state, $filter, Restangular, localStorageService) {
            var resultsCtrl = this;
            var selectedPerson = $rootScope.selectedPerson;
            if(!$rootScope.savedSearchResults) {
                resultsCtrl.loaded = false;

                if($rootScope.keno) {
                    Restangular.all('persons').getList().then(function(persons) {
                        resultsCtrl.persons = [];
                        resultsCtrl.signals = [];
                        _.forEach(persons, function(value) {
                            var clean_value = _.toLower(_.trim(value.keno));
                            if(_.startsWith(clean_value, $rootScope.keno)) {
                                resultsCtrl.persons[resultsCtrl.persons.length] = value;
                                if(value.signals.length > 0) {
                                    $rootScope.personAlert = true;
                                    value.hasDanger = true;
                                }
                                if(value.dangers.length > 0) {
                                    $rootScope.personAlert = true;
                                }
                            }
                        });
                        $rootScope.savedSearchResults = resultsCtrl.persons;

                        console.log('resultsCtrl.personAlert', resultsCtrl.personAlert);

                        resultsCtrl.loaded = true;
                    });

                    var addToHistory = {
                        type: 'Kenosleutel',
                        icon: 'searchable',
                        category: 'person',
                        datetime: new Date(),
                        string: $rootScope.keno
                    };

                    var history = localStorageService.get('history');
                    if(history) {
                        history = _.concat(history, addToHistory);
                        localStorageService.set('history', history);
                    } else {
                        localStorageService.set('history', [addToHistory]);
                    }

                    if(history.length > 20) {
                        localStorageService.set('history', _.drop(history, 5));
                    }
                }
            } else {
                resultsCtrl.persons = $rootScope.savedSearchResults;
                resultsCtrl.loaded = true;
            }

            resultsCtrl.select = function(person) {
                $rootScope.selectedPerson = person;
                $state.go('results.person');
            }
    });

angular.module('meosApp')
    .controller('resultsMainController', function($rootScope) {
            var resultsMainCtrl = this;
            $rootScope.$watch('personAlert', function(newValue) {
                resultsMainCtrl.personAlert = newValue;
                console.log(newValue);
            });
        });