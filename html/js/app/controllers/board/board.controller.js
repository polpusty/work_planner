planner.controller('BoardListController', function ($scope, Board) {
    Board.listNotArchived().then(data =>{
        $scope.boards = data.data;
    });

    $scope.addBoard = addBoard;
    $scope.archiveBoard = archiveBoard;

    function addBoard() {
        $scope.boards.push($scope.newBoard);
        Board.create($scope.newBoard).then(data =>{
            $scope.newBoard.id = data.data.id;
            $scope.newBoard = {};
        }).catch(data =>{
            $scope.boards.splice($scope.boards.indexOf(board), 1)
        })
    }

    function archiveBoard(board) {
        board.archived = true;
        Board.update(board).then(data =>{
            $scope.boards.splice($scope.boards.indexOf(board), 1)
        }).catch(data =>{
            board.archived = false;
            $scope.boards.push(board);
        })
    }
});

planner.controller('BoardDetailsController', function($scope, $state, $stateParams, Board, Column, Note) {
    let board_id = $stateParams.boardId;

    Board.get(board_id).then(data =>{
        $scope.board = data.data;
    }).catch(data =>{
        $state.go('app.board');
    });

    Column.columnInBoards(board_id).then(data =>{
        $scope.columns = data.data;
        $scope.columns.forEach((column, index, columns) =>{
            Note.notesInColumn(column.id).then(data =>{
                columns[index].notes = data.data;
            })
        });
    });

    $scope.addNote = addNote;
    $scope.addColumn = addColumn;
    $scope.archiveNote = archiveNote;
    $scope.archiveColumn = archiveColumn;
    $scope.dropCallback = dropCallback;
    $scope.startCallback = startCallback;

    function addNote (column) {
        column.newNote.column = column.id;
        column.notes.push(column.newNote);
        Note.create(column.newNote).then(data =>{
            column.newNote.id = data.data.id;
            column.newNote = {};
        }).catch(data =>{
            column.notes.splice(column.notes.indexOf(column.newNote), 1);
        });
    }

    function addColumn() {
        $scope.newColumn.board = $scope.board.id;
        $scope.newColumn.notes = [];
        $scope.columns.push($scope.newColumn);

        Column.create($scope.newColumn).then(data =>{
            $scope.newColumn.id = data.data.id;
            $scope.newColumn = {};
        }).catch(data =>{
            $scope.columns.splice($scope.columns.indexOf($scope.newColumn), 1);
        })
    }

    function archiveNote(note, column) {
        note.archived = true;
        column.notes.splice(column.notes.indexOf(note), 1);
        Note.update(note).catch(data =>{
            note.archived = false;
            column.notes.push(note);
        })
    }

    function archiveColumn(column) {
        column.archived = true;
        $scope.columns.splice($scope.columns.indexOf(column), 1)
        Column.update(column).catch(data =>{
            column.archived = false;
            $scope.columns.push(column);
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
