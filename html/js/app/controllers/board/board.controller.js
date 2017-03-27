planner.controller('BoardListController', function ($scope, Board) {
    Board.list().then(function (data) {
        $scope.boards = data.data;
    });

    $scope.addBoard = addBoard;
    $scope.deleteBoard = deleteBoard;

    function addBoard() {
        Board.create($scope.newBoard).then(function (data) {
            $scope.boards.push(data.data);
            $scope.newBoard = {};
        })
    }

    function deleteBoard(board) {
        Board.destroy(board.id).then(function (data) {
            $scope.boards.splice($scope.boards.indexOf(board), 1)
        })
    }
});

planner.controller('BoardDetailsController', function ($scope, $state, $stateParams, Board, Column, Note) {
    var board_id = $stateParams.boardId;

    Board.get(board_id).then(function (data) {
        $scope.board = data.data;
    });

    Column.columnInBoards(board_id).then(function (data) {
        $scope.columns = data.data;
        $scope.columns.forEach(function(column, index, columns){
            Note.notesInColumn(column.id).then(function (data) {
                columns[index].notes = data.data;
            })
        });
    });

    $scope.addNote = addNote;
    $scope.addColumn = addColumn;
    $scope.dropCallback = dropCallback;
    $scope.startCallback = startCallback;

    function addNote (column) {
        column.newNote.column = column.id;
        Note.create(column.newNote).then(function (data) {
            column.notes.push(data.data);
            column.newNote = {};
        })
    }

    function addColumn() {
        $scope.newColumn.board = $scope.board.id;
        Column.create($scope.newColumn).then(function (data) {
            var newColumn = data.data;
            newColumn.notes = [];
            $scope.columns.push(newColumn);
            $scope.newColumn = {};
        })
    }

    function dropCallback(event, ui, column) {
        if(column.id !== $scope.dragColumn.id) {
            $scope.dragNote.column = column.id;
            Note.update($scope.dragNote);
        }
    }

    function startCallback(event, ui, note, $index, column) {
        $scope.dragNote = note;
        $scope.dragColumn = column;
    }
});
