planner.factory('Authentication', function ($http, $cookies, $state, API) {
    return {
        register: register,
        login: login,
        logout: logout,

        putUser: putUser,
        getUser: getUser,
        removeUser: removeUser,

        putToken: putToken,
        getToken: getToken,
        removeToken: removeToken
    };

    function register(user) {
        return $http.post(API.URL + '/authentication/register/', user).then(
            function (data, status, headers, config) {
                login(user.username, user.password);
            }
        )
    }

    function login(username, password) {
        return $http.post(API.URL + '/authentication/login/', {
            username: username, password: password
        }).then(function (data, status, headers, config) {
            var token = data.data;
            putUser(token.user_instance);
            putToken(token.key);
            $state.reload('app');
        });
    }

    function logout() {
        return $http.post(API.URL + '/authentication/logout/', {}).then(function (data, status, headers, config) {
            removeToken();
            removeUser();
            $state.reload('app.login');
        })
    }

    function putUser(user) {
        var expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        return $cookies.putObject('user', user, {
            expires: expires
        });
    }

    function getUser(user) {
        return $cookies.getObject('user');
    }

    function removeUser() {
        return $cookies.remove('user');
    }

    function putToken(token) {
        $http.defaults.headers.common.Authorization = 'Token ' + token;
        var expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        return $cookies.putObject('token', token, {
            expires: expires
        });
    }

    function getToken(token) {
        return $cookies.getObject('token');
    }

    function removeToken() {
        $http.defaults.headers.common.Authorization = '';
        return $cookies.remove('token');
    }
});
