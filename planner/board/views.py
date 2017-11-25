from rest_framework import viewsets, permissions, filters, response, status

from .models import Board, Column, Note, BoardUser
from .permissions import BoardPermission, ColumnPermission, NotePermission
from .serializers import BoardSerializer, ColumnSerializer, NoteSerializer


class BoardViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    serializer_class = BoardSerializer
    permission_classes = (permissions.IsAuthenticated, BoardPermission,)
    filter_backends = filters.DjangoFilterBackend,
    filter_fields = 'archived',

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        board = Board.objects.get(pk=serializer.data['id'])
        BoardUser.objects.create(user=request.user, board=board, is_admin=True)
        headers = self.get_success_headers(serializer.data)
        return response.Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


    def get_queryset(self):
        if self.request.user.is_staff:
            return Board.objects.all()
        else:
            return Board.objects.filter(boarduser__user=self.request.user)


class ColumnViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    serializer_class = ColumnSerializer
    permission_classes = (permissions.IsAuthenticated, ColumnPermission,)
    filter_backends = filters.DjangoFilterBackend,
    filter_fields = 'board', 'archived'

    def get_queryset(self):
        if self.request.user.is_staff:
            return Column.objects.all()
        else:
            return Column.objects.filter(board__boarduser__user=self.request.user)


class NoteViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    serializer_class = NoteSerializer
    permission_classes = (permissions.IsAuthenticated, NotePermission,)
    filter_backends = filters.DjangoFilterBackend,
    filter_fields = 'column', 'archived'

    def get_queryset(self):
        if self.request.user.is_staff:
            return Note.objects.all()
        else:
            return Note.objects.filter(column__board__boarduser__user=self.request.user)
