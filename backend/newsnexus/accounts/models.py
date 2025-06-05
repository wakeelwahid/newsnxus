from django.db import models

# Create your models here.
# accounts/models.py
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, mobile, name, password=None):
        user = self.model(
            mobile=mobile,
            name=name,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser):
    mobile = models.CharField(max_length=15, unique=True)
    name = models.CharField(max_length=100)
    date_joined = models.DateTimeField(auto_now_add=True)
    
    USERNAME_FIELD = 'mobile'
    REQUIRED_FIELDS = ['name']
    
    objects = CustomUserManager()