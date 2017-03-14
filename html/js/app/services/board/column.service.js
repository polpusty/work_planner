planner.factory('Column', function ($http, API) {
    return {
        list: list,
        get: get,
        create: create,
        update: update,
        destroy: destroy,
        columnInBoards: columnInBoards
    };

    function list() {
        return $http.get(API.URL_V1 + 'columns/')
    }

    function get(id) {
        return $http.get(API.URL_V1 + 'columns/' + id + '/')
    }

    function create(column) {
        return $http.post(API.URL_V1 + 'columns/', column)
    }

    function update(column) {
        return $http.put(API.URL_V1 + 'columns/' + column.id + '/', column)
    }

    function destroy(id) {
        return $http.delete(API.URL_V1 + 'columns/' + id + '/')
    }

    function columnInBoards(board_id) {
        return $http.get(API.URL_V1 + 'columns/?board=' + board_id)
    }
});
