from django.db import models
from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin


class CustomUserManager(BaseUserManager):
    use_in_migrations = True

    def _create_account(self, username, email, password, **kwargs):
        if not username:
            raise ValueError("Username is required")
        username = self.model.normalize_username(username)
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **kwargs)
        user.set_password(password)
        user.save(self.db)
        return user

    def create_superuser(self, username, email, password, **kwargs):
        kwargs.setdefault('is_staff', True)
        kwargs.setdefault('is_superuser', True)
        kwargs.setdefault('is_active', True)
        return self._create_account(username, email, password, **kwargs)

    def create_user(self, username, email, password, **kwargs):
        kwargs.setdefault('is_staff', False)
        kwargs.setdefault('is_superuser', False)
        return self._create_account(username, email, password, **kwargs)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=32, unique=True)
    email = models.EmailField(max_length=256, unique=True)
    is_staff = models.BooleanField(default=False, help_text=u'Je li korisnik trener')
    is_active = models.BooleanField(default=False)

    # unique identifier via default auth backend
    # don't include username field in required fields because it is always prompted
    USERNAME_FIELD = 'username'

    # fields for creating superuser
    REQUIRED_FIELDS = ['email']

    objects = CustomUserManager()
