app.config(function ($stateProvider) {

    // $stateProvider.state('signup', {
    //     url: '/signup',
    //     templateUrl: 'js/signup/signup.html',
    //     controller: 'SignupCtrl'
    // });

});

app.controller('SignupCtrl', function ($scope, AuthService, $state) {

    $scope.login = {};
    $scope.error = null;

    $scope.createAccount = function (credentials) {

        $scope.error = null;

        AuthService.signup(credentials).then(function () {
            $state.go('dashboard');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});
