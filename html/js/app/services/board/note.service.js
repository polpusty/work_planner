planner.factory('Note', function ($http, API) {
    return {
        list: list,
        get: get,
        create: create,
        update: update,
        destroy: destroy,
        notesInColumn: notesInColumn
    };

    function list() {
        return $http.get(API.URL_V1 + 'notes/')
    }

    function get(id) {
        return $http.get(API.URL_V1 + 'notes/' + id + '/')
    }

    function create(note) {
        return $http.post(API.URL_V1 + 'notes/', note)
    }

    function update(note) {
        return $http.put(API.URL_V1 + 'notes/' + note.id + '/', note)
    }

    function destroy(id) {
        return $http.delete(API.URL_V1 + 'notes/' + id + '/')
    }

    function notesInColumn(column_id) {
        return $http.get(API.URL_V1 + 'notes/?column=' + column_id)
    }
});
