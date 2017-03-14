planner.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state({
            name: 'app',
            url: '/',
            views: {
                '': {
                    templateUrl: '/templates/app.html'
                },
                'nav@app': {
                    templateUrl: '/templates/nav.html',
                    controller: 'NavController'
                }
            }
        })

        .state({
            name: 'app.login',
            url: 'login',
            templateUrl: '/templates/authentication/login.html',
            controller: 'LoginController'
        })

        .state({
            name: 'app.register',
            url: 'register',
            templateUrl: '/templates/authentication/register.html',
            controller: 'RegisterController'
        })

        .state({
            name: 'app.board',
            url: 'board/',
            templateUrl: '/templates/board/board.html'
        })

        .state({
            name: 'app.board.list',
            url: 'list',
            templateUrl: '/templates/board/list.html',
            controller: 'BoardListController'
        })

        .state({
            name: 'app.board.details',
            url: ':boardId',
            templateUrl: '/templates/board/details.html',
            controller: 'BoardDetailsController'
        })
    ;
});
