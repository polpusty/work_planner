planner.factory('Board', function ($http, API) {
    return {
        list: list,
        get: get,
        create: create,
        update: update,
        destroy: destroy
    };

    function list() {
        return $http.get(API.URL_V1 + 'boards/')
    }

    function get(id) {
        return $http.get(API.URL_V1 + 'boards/' + id + '/')
    }

    function create(board) {
        return $http.post(API.URL_V1 + 'boards/', board)
    }

    function update(board) {
        return $http.put(API.URL_V1 + 'boards/' + board.id + '/', board)
    }

    function destroy(id) {
        return $http.delete(API.URL_V1 + 'boards/' + id + '/')
    }
});
