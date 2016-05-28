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
      data: {
        authenticate: true
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

    $scope.getSECDocs = function() {
      $http({
        method: "GET",
        url: 'http://mtd-sec-api.herokuapp.com/sec_sd_filings/' + $scope.company.cik
      })
      .then(function(suc){
        console.log(suc);
      });
    }

});
