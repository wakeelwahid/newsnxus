from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, mobile, name, password=None):
        if not mobile:
            raise ValueError("Users must have a mobile number")
        user = self.model(mobile=mobile, name=name)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, mobile, name, password=None):
        user = self.create_user(mobile, name, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser, PermissionsMixin):
    mobile = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'mobile'
    REQUIRED_FIELDS = ['name']

    objects = CustomUserManager()

    def __str__(self):
        return self.mobile
