app.config(function ($stateProvider) {
    $stateProvider
    .state('company', {
      url: '/company/:id',
      templateUrl: 'js/company/company.html',
      controller: 'CompanyController',
      resolve: {
        resolvedCompany: function ($http, $state, $stateParams) {
          if ($stateParams.id) {
            console.log("Editing Company");
            return $http.get('/api/company/' + $stateParams.id)
            .then(function(res) {
              console.log(res.data);
              return res.data;
            });
          } else {
            console.log("New Company");
            return {};
          }
        }
      }
    });
});

app.controller("CompanyController", function($scope, $http, $state, resolvedCompany) {

    $scope.company = resolvedCompany;

    $scope.addCompany = function(company) {
      console.log('adding company');
      $http.post('/api/company', {
        company: company
      }).then(function(data) {
        console.log(data);
        $state.go('dashboard');
      });
    }

    $scope.updateCompany = function(company) {
      console.log('updating company');
      $http.put('/api/company', {
        company: company
      }).then(function(data) {
        console.log(data);
        $state.go('dashboard');
      })
    }


});