planner.controller('LoginController', function($scope, $state, Authentication){
  if(Authentication.getUser()) {
    $state.go('app');
  }

  $scope.username = '';
  $scope.password = '';

  $scope.login = login;

  function login() {
    Authentication.login($scope.username, $scope.password);
  }
})
