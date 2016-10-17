angular.module('proto.loginController', [])
    .controller('loginController', function($scope, $state, $location) {
        $scope.loginClicked = function() {
            console.log('clicked')
           $location.path('/signup')
        }
    })