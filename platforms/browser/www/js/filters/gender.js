angular.module('meosApp')
    .filter('gender', function() {
        return function(input) {
            if(input == 'm') {
                return 'Man';
            } else if(input == 'f') {
                return 'Vrouw';
            } else {
                return '';
            }
        }
    });