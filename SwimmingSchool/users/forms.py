from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser


class CustomUserCreationForm(UserCreationForm):
    """
        Class for creating user via django admin site
    """
    class Meta(UserCreationForm):
        model = CustomUser
        fields = ('username',
                  'email',
                  'password1',
                  'password2')


class CustomUserChangeForm(UserChangeForm):

    class Meta:
        model = CustomUser
        fields = ('username',
                  'email',
                  'is_staff')
