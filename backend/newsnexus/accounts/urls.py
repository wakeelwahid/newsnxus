# accounts/urls.py
from django.urls import path
from .views import RegisterView, LoginView, UserProfileView, proxy_news

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path("news/", proxy_news,name="proxy_news"),

]