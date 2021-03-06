from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_auth.serializers import JWTSerializer
from rest_framework.validators import UniqueValidator
from django.core import exceptions
from swimmingschoolapp.models import *
from .models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(read_only=True, required=False)
    username = serializers.CharField(read_only=True, required=False)
    id = serializers.IntegerField()

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'is_active', 'is_staff']


class UserRegistrationSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        validators=[UniqueValidator(queryset=CustomUser.objects.all())]
    )
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=CustomUser.objects.all())]
    )
    password = serializers.CharField(min_length=8)

    def validate(self, data):
        password = data.get('password')

        errors = dict()
        try:
            validate_password(password=password, user=CustomUser(**data))
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)

        if errors:
            raise serializers.ValidationError(errors)

        return super(UserRegistrationSerializer, self).validate(data)

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = CustomUser.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()

        return user


# copy of DRF AuthTokenSerializer
class LoginSerializer(serializers.Serializer):

    username = serializers.CharField(label='Username')
    password = serializers.CharField(
        label='Password',
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            user = authenticate(username=username, password=password)

            if not user:
                msg = 'Unable to log in with provided credentials.'
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = 'Must include "username/email" and "password".'
            raise serializers.ValidationError(msg, code='authorization')

        attrs['user'] = user
        return attrs


class CheckUsernameSerializer(serializers.Serializer):

    username = serializers.CharField()

    def validate_username(self, data):
        if User.objects.filter(username=data).exists():
            raise serializers.ValidationError('User with given username already exists')

        return data


class CheckEmailSerializer(serializers.Serializer):

    email = serializers.EmailField(required=True)

    def validate_email(self, data):
        if User.objects.filter(email=data).exists():
            raise serializers.ValidationError('User with given email already exists')

        return data


class ChangePasswordSerializer(serializers.Serializer):

    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, data):
        user = self.context.get('user')
        validate_password(data, user)
        return data
