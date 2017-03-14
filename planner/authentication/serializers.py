from rest_framework import serializers
from rest_framework.authtoken.models import Token

from .models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'is_staff', 'is_active', 'logo', 'password',)

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class TokenSerializer(serializers.ModelSerializer):
    user_instance = UserSerializer(source='user')
    class Meta:
        model = Token
        fields = ('key', 'user_instance', 'created',)
