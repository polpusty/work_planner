from rest_framework import viewsets, permissions, filters

from .models import Board, Column, Note
from .permissions import BoardPermission, ColumnPermission, NotePermission
from .serializers import BoardSerializer, ColumnSerializer, NoteSerializer


class BoardViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    serializer_class = BoardSerializer
    permission_classes = (permissions.IsAuthenticated, BoardPermission,)

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
    filter_fields = 'board',

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
    filter_fields = 'column',

    def get_queryset(self):
        if self.request.user.is_staff:
            return Note.objects.all()
        else:
            return Note.objects.filter(column__board__boarduser__user=self.request.user)
