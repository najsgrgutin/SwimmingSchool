from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.core import exceptions
from swimmingschool.models import *
from .models import CustomUser


class UserSerializer(serializers.ModelSerializer):

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
