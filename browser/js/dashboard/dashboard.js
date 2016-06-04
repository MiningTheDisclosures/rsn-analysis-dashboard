app.config(function ($stateProvider) {
    $stateProvider.state('dashboard', {
      url: '/dashboard',
      templateUrl: 'js/dashboard/dashboard.html',
      controller: 'DashboardController',
      resolve: {
        resolvedCompanies: function($http) {
          return $http.get('/api/company')
            .then(function(res) {
              return res.data;
            });
        }
      },
      data: {
        authenticate: true
      }
    });
});

app.controller("DashboardController", function($scope, $http, resolvedCompanies) {

  $scope.companies = resolvedCompanies;
  $scope.getReviewId = function(company, year) {
    for (var i = 0; i < company.reviews.length; i++) {
      if (company.reviews[i].year === year){
        return company.reviews[i]._id;
      }
    }
    return null;
  }
  $scope.getReviewScore = function(company, year) {
    for (var i = 0; i < company.reviews.length; i++) {
      if (company.reviews[i].year === year){
        return company.reviews[i].total;
      }
    }
    return null;
  }
  $scope.getSECUrl = function(company, year) {
    for (var i = 0; i < company.sec_filings.length; i++) {
      if (company.sec_filings[i].year === year){
        return company.sec_filings[i].url;
      }
    }
    return null;
  }

});
