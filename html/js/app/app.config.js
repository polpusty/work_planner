planner.value({
    API: {
        URL: '',
        URL_V1: '/api/v1/'
    }
});

planner.run(function ($http, $cookies) {
    if ($cookies.getObject('token')) {
        $http.defaults.headers.common.Authorization = 'Token ' + $cookies.getObject('token');
    }
});
