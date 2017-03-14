planner.value({
    API: {
        URL: 'http://127.0.0.1:8000',
        URL_V1: 'http://127.0.0.1:8000/api/v1/'
    }
});

planner.run(function ($http, $cookies) {
    if ($cookies.getObject('token')) {
        $http.defaults.headers.common.Authorization = 'Token ' + $cookies.getObject('token');
    }
});
