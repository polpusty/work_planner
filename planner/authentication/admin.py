from django.contrib import admin

from .models import User


class UserAdminModel(admin.ModelAdmin):
    exclude = ('password',)

admin.site.register(User, UserAdminModel)
