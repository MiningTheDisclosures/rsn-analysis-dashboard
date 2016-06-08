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
        url: 'https://mtd-sec-api.herokuapp.com/sec_sd_filings/' + $scope.company.cik
      })
      // Once we get the SD urls
      .then(function(sucSD) {

        // Count till parallel operations are done
        var iterations = Object.keys(sucSD.data).length;
        var completed = 0;

        Object.keys(sucSD.data).forEach(function(year){
          $http({
            method: "GET",
            url: 'https://mtd-sec-api.herokuapp.com/sec_supporting_docs/' + $scope.company.cik + '/' + year
          })
          // Then get supporting doc info 
          .then(function(sucDetails) {
            console.log(sucDetails.data);
            $http({
              method: 'POST',
              url: '/api/docs',
              data: {
                docs: sucDetails.data,
                id: $scope.company._id,
                year: year
              }
            }).then(function(success) {
              completed++; 
              if (iterations === completed){
                $state.reload();
              }
            })
          });
        });

      });
    }

    $scope.getCompanyInfo = function() {
      var symbol = $scope.company.cik || $scope.company.ticker.symbol;
      $http({
        method: "GET",
        url: 'https://mtd-sec-api.herokuapp.com/company/' + symbol
      }).then(function(suc) {
        console.log(suc.data);
        $scope.company.name = suc.data.company_name;
        $scope.company.cik = suc.data.cik;
        $scope.company.sic = {
          code: suc.data.sic_code,
          description: suc.data.sic_description
        }
      }, function(err) {
        console.log(err);
      })
    }

});
