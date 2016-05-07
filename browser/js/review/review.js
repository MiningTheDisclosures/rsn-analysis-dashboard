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
            console.log("Editing Review");
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

});
