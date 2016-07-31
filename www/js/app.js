var app = angular.module('meosApp', ['ngRoute', 'restangular', 'ui.router', 'LocalStorageModule'])
    .service('prevState', function($rootScope) {
        $rootScope.$on('$stateChangeSuccess',
            function(ev, to, toParams, from, fromParams){
                console.log(from);
            })
    })

    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('main', {
                url: "/",
                views: {
                    "content": { templateUrl: "views/mainView.html", controller: 'mainController as mainCtrl' }
                }
            })
            .state('login', {
                url: "/login",
                views: {
                    "content": { templateUrl: "views/loginView.html", controller: 'authController as authCtrl' }
                }
            })
            .state('persons', {
                url: "/persons",
                views: {
                    "content": { templateUrl: "views/personView.html", controller: 'personController as resultsCtrl' },
                    "footer": { templateUrl: "views/footerView.html", controller: 'footerController as footerCtrl' }
                }
            })
            .state('vehicles', {
                url: "/vehicles",
                views: {
                    "content": { templateUrl: "views/vehicleView.html", controller: 'vehicleController as vehicleCtrl' },
                    "footer": { templateUrl: "views/footerView.html", controller: 'footerController as footerCtrl' }
                }
            })
            .state('search', {
                url: "/search",
                views: {
                    "content": { templateUrl: "views/searchView.html", controller: 'searchController as searchCtrl' },
                    "footer": { templateUrl: "views/footerView.html", controller: 'footerController as footerCtrl' }
                }
            })
            .state('search.document', {
                url: "/document",
                views: {
                    "search": { templateUrl: "views/search/document.html", controller: 'searchController as searchCtrl' },
                    "footer": { templateUrl: "views/footerView.html", controller: 'footerController as footerCtrl' }
                }
            })
            .state('search.name', {
                url: "/name",
                views: {
                    "search": { templateUrl: "views/search/name.html", controller: 'searchController as searchCtrl' },
                    "footer": { templateUrl: "views/footerView.html", controller: 'footerController as footerCtrl' }
                }
            })
            .state('search.license', {
                url: "/license",
                views: {
                    "search": { templateUrl: "views/search/license.html", controller: 'vehicleController as vehicleCtrl' },
                    "footer": { templateUrl: "views/footerView.html", controller: 'footerController as footerCtrl' }
                }
            })
            .state('search.licensescan', {
                url: "/licensescan",
                views: {
                    "search": { templateUrl: "views/search/licenseScan.html", controller: 'vehicleController as vehicleCtrl' },
                    "footer": { templateUrl: "views/footerView.html", controller: 'footerController as footerCtrl' }
                }
            })
            .state('results', {
                    url: "/results",
                    views: {
                        "content": { templateUrl: "views/resultsView.html", controller: 'resultsMainController as resultsMainCtrl' },
                        "footer": { templateUrl: "views/footerView.html", controller: 'footerController as footerCtrl' },
                    }
            })
            .state('results.ib', {
                    url: "/ib",
                    views: {
                        "display": { templateUrl: "views/partials/_ib.html", controller: 'resultsController as resultsCtrl' },
                        "footer": { templateUrl: "views/footerView.html", controller: 'footerController as footerCtrl' },
                    }
            })
            .state('results.id', {
                    url: "/id",
                    views: {
                        "display": { templateUrl: "views/partials/_id.html", controller: 'singlePersonController as singlePersonCtrl' },
                        "footer": { templateUrl: "views/footerView.html", controller: 'footerController as footerCtrl' },
                    }
            })
            .state('results.person', {
                    url: "/person",
                    views: {
                        "display": { templateUrl: "views/partials/_person.html", controller: 'singlePersonController as singlePersonCtrl' },
                        "footer": { templateUrl: "views/footerView.html", controller: 'footerController as footerCtrl' },
                    }
            })
            .state('resultsVehicle', {
                    url: "/resultsvehicle",
                    views: {
                        "content": { templateUrl: "views/resultsVehicleView.html" },
                        "footer": { templateUrl: "views/footerView.html", controller: 'footerController as footerCtrl' },
                    }
            })
            .state('resultsVehicle.vehicle', {
                    url: "/vehicle",
                    views: {
                        "display": { templateUrl: "views/partials/_vehicle.html", controller: 'singleVehicleController as singleVehicleCtrl' },
                        "footer": { templateUrl: "views/footerView.html", controller: 'footerController as footerCtrl' },
                    }
            })
            .state('resultsVehicle.ib', {
                    url: "/ib",
                    views: {
                        "display": { templateUrl: "views/partials/_ib-vehicle.html", controller: 'resultsVehicleController as resultsVehicleCtrl' },
                        "footer": { templateUrl: "views/footerView.html", controller: 'footerController as footerCtrl' },
                    }
            })
            .state('history', {
                    url: "/history",
                    views: {
                        "content": { templateUrl: "views/historyView.html", controller: 'historyController as historyCtrl' },
                        "footer": { templateUrl: "views/footerView.html", controller: 'footerController as footerCtrl' },
                    }
            });
    });
angular.module('meosApp').config(function(RestangularProvider){
    RestangularProvider.setBaseUrl('https://meosprod.herokuapp.com/');
    RestangularProvider.setRequestSuffix('/');
    RestangularProvider.setDefaultHttpFields({cache: true});
});

app.run(function($state, Restangular, localStorageService) {
    Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {

        if(response.status === 401) {

            if(localStorageService.get('token')) {
                Restangular.setDefaultHeaders({ Authorization: 'Token ' + localStorageService.get('token') });
                return false;
            } else {
                $state.go('login');
                return true;
            }

        }

        return true; // error not handled
    });
});

app.run(function($rootScope) {
    $rootScope.$on('$stateChangeSuccess',
        function(ev, to, toParams, from, fromParams){
            if(from.name == "") {
                $rootScope.prevState = false;
            }
            $rootScope.prevState = from;
        });
});

function getMobileOS() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  console.log(userAgent);

  if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) )
  {
    return 'iOS';

  }
  else if( userAgent.match( /Android/i ) )
  {

    return 'Android';
  }
  else
  {
    return 'unknown';
  }
}

$(function() {
    if(getMobileOS() == 'Android') {
        console.log('Android detected');
        $('body').addClass('android');
    }
    if(getMobileOS() == 'iOS') {
        $('body').addClass('iphone');
    }
});

