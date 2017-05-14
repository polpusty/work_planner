planner.controller('RegisterController', function ($scope, $state, Authentication) {
  if(Authentication.getUser()) {
    $state.go('app');
  }

  $scope.register = register;

  function register() {
    Authentication.register($scope.user);
  }
});
