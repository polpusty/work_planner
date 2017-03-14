from rest_framework import permissions


class BoardPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user in obj.user.all() or request.user.is_staff


class ColumnPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user in obj.board.user.all() or request.user.is_staff


class NotePermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user in obj.column.board.user.all() or request.user.is_staff
