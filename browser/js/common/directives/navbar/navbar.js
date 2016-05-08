app.directive('navbar', function ($rootScope, $http, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope, element, attributes) {

            scope.items = [
                // { label: 'Home', state: 'home' },
                // { label: 'About', state: 'about' },
                // { label: 'Documentation', state: 'docs' },
                // { label: 'Members Only', state: 'membersOnly', auth: true }
            ];

            scope.viewingReport = true;
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams) {
                scope.viewingReport = $state.includes('report') || $state.includes('signup') || $state.includes('login');
            });

            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('report');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

            scope.downloadCSV = function() {
                console.log('Downloading CSV');
            }

            scope.downloadJSON = function() {
                $http.get('/api/company')
                    .then(function(res) {

                        var data = res.data;
                        var filename = 'rsn-data.json'
                        // Handle Download
                        if (!data) {
                            console.error('No data');
                            return;
                        }

                        if (typeof data === 'object') {
                            data = JSON.stringify(data, undefined, 2);
                        }

                        var blob = new Blob([data], {type: 'text/json'}),
                        e = document.createEvent('MouseEvents'),
                        a = document.createElement('a');

                        a.download = filename;
                        a.href = window.URL.createObjectURL(blob);
                        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
                        e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                        a.dispatchEvent(e);

                    });
            }

        }

    };

});
