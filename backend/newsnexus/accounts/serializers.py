# accounts/serializers.py
from rest_framework import serializers
from .models import CustomUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('mobile', 'name', 'date_joined')

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['mobile'] = user.mobile
        token['name'] = user.name
        return token

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = CustomUser
        fields = ('mobile', 'name', 'password')
    
    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            mobile=validated_data['mobile'],
            name=validated_data['name'],
            password=validated_data['password']
        )
        return user