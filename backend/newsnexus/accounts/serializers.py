# accounts/serializers.py
from rest_framework import serializers
from .models import CustomUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('mobile', 'name', 'date_joined')

# accounts/serializers.py

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['mobile'] = user.mobile
        token['name'] = user.name
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        
        # ✅ Add extra user data in the login response
        data['user'] = {
            'mobile': self.user.mobile,
            'name': self.user.name,
            'date_joined': self.user.date_joined,
        }

        return data


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