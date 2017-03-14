planner.controller('NavController', function($scope, $state, Authentication){
  $scope.user = Authentication.getUser();

  $scope.logout = logout;

  function logout() {
    Authentication.logout();
    $state.go('app.login')
  }
});
