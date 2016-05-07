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
        onEnter: function($state, AuthService) {
          // Check to see if we're authed
          if (!AuthService.isAuthenticated()) {
            $state.go('report');
          }
        }
    });
});

app.controller("DashboardController", function($scope, resolvedCompanies) {

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
    return 'No Evaluation';
  }

});
