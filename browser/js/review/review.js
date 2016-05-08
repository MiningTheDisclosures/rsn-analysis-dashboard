app.config(function ($stateProvider) {
    $stateProvider
    .state('review', {
      url: '/review/:id',
      templateUrl: 'js/review/review.html',
      controller: 'ReviewController',
      params: {
        company: null,
        year: null
      },
      resolve: {
        resolvedReview: function($http, $state, $stateParams) {
          if ($stateParams.id) {
            return $http.get('/api/review/' + $stateParams.id)
            .then(function(res) {
              return res.data;
            });
          } else {
            return $http.post('/api/review', {
              company: $stateParams.company,
              year: $stateParams.year
            })
            .then(function(res) {
              return res.data;
            })
          }
        }
      },
      data: {
        authenticate: true
      }
    });
});

app.controller("ReviewController", function($scope, $http, $state, resolvedReview, IndicatorFactory) {

  $scope.review = resolvedReview;
  $scope.indicators = IndicatorFactory;

  $scope.updateEvaluation = function(review){
    $http.put('/api/review/updateEvaluation', {
      'id': review._id,
      'evaluation': review.evaluation
    })
    .then(function(data){
      $state.reload();
    })
  }

  $scope.getSECUrl = function(review){
    for (var i = 0; i < review.company.sec_filings.length; i++) {
      if (review.company.sec_filings[i].year === review.year){
        return review.company.sec_filings[i].url;
      }
    }
    return null;
  }

});
