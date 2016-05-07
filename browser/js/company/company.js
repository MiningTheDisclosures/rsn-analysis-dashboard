app.config(function ($stateProvider) {
    $stateProvider
    .state('company', {
      url: '/company/:id',
      templateUrl: 'js/company/company.html',
      controller: 'CompanyController',
      resolve: {
        resolvedCompany: function ($http, $state, $stateParams) {
          if ($stateParams.id) {
            return $http.get('/api/company/' + $stateParams.id)
            .then(function(res) {
              return res.data;
            });
          } else {
            return {};
          }
        }
      },
      onEnter: function($state, AuthService) {
        // Check to see if we're authed
        if (!AuthService.isAuthenticated()) {
          $state.go('report');
        }
      }
    });
});

app.controller("CompanyController", function($scope, $http, $state, resolvedCompany) {

    $scope.company = resolvedCompany;

    $scope.addCompany = function(company) {
      $http.post('/api/company', {
        company: company
      }).then(function(data) {
        $state.go('dashboard');
      });
    }

    $scope.updateCompany = function(company) {
      $http.put('/api/company', {
        company: company
      }).then(function(data) {
        $state.go('dashboard');
      })
    }


});
