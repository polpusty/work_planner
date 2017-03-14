from django.contrib import admin

from.models import Board, BoardUser, Column, Note

admin.site.register(Board, admin.ModelAdmin)
admin.site.register(BoardUser, admin.ModelAdmin)
admin.site.register(Column, admin.ModelAdmin)
admin.site.register(Note, admin.ModelAdmin)
