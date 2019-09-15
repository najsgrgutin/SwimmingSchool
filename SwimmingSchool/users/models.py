from django.db import models
from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin


class CustomUserManager(BaseUserManager):
    use_in_migrations = True

    def _create_account(self, username, password, **kwargs):
        if not username:
            raise ValueError("Username is required")

        username = self.model.normalize_username(username)
        user = self.model(username=username, **kwargs)
        user.set_password(password)
        user.save(self.db)
        return user

    def create_superuser(self, username, password, **kwargs):
        kwargs.setdefault('is_staff', True)
        kwargs.setdefault('is_superuser', True)
        kwargs.setdefault('is_active', True)
        return self._create_account(username, password, **kwargs)

    def create_user(self, username, password, **kwargs):
        kwargs.setdefault('is_staff', False)
        kwargs.setdefault('is_superuser', False)
        return self._create_account(username, password, **kwargs)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=20, unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'

    objects = CustomUserManager()