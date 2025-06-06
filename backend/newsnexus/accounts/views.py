from django.shortcuts import render

# Create your views here.
# accounts/views.py
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSerializer, RegisterSerializer, CustomTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "message": "User created successfully",
            "user": UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)


class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class UserProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    
    def get_object(self):
        return self.request.user


# views.py

from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests  # <- Must be AFTER DRF imports, just in case

@api_view(['GET'])
def proxy_news(request):
    url = "https://newsapi.org/v2/everything?q=technology&pageSize=10&sortBy=publishedAt&apiKey=a0fe55c23ecf420f952ff5f45c31b797"
    
    try:
        res = requests.get(url)
        return Response(res.json())
    except requests.exceptions.RequestException as e:
        return Response({"error": str(e)}, status=500)


