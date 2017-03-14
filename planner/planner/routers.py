from rest_framework import routers

from authentication.views import UserViewSet
from board.views import BoardViewSet, ColumnViewSet, NoteViewSet

router = routers.SimpleRouter()

router.register(r'users', UserViewSet, 'User')

router.register(r'boards', BoardViewSet, 'Board')
router.register(r'columns', ColumnViewSet, 'Column')
router.register(r'notes', NoteViewSet, 'Note')
