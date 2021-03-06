import jwt, json
from rest_framework_jwt import settings
from datetime import datetime
from django.shortcuts import render
from rest_framework import viewsets, status, views
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import permissions
# from rest_framework_jwt.
from rest_framework_jwt.views import ObtainJSONWebToken
from django.contrib.auth import get_user_model, authenticate
from users.serializers import UserSerializer, UserRegistrationSerializer, \
    ChangePasswordSerializer, CheckEmailSerializer, CheckUsernameSerializer, LoginSerializer

from SwimmingSchool.settings import JWT_AUTH

User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'username'
    http_method_names = ['get', 'patch', 'post', 'delete']

    @action(methods=['post'], detail=False, permission_classes=[permissions.AllowAny], url_path='registration')
    def user_registration(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.is_active = True
            user.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(views.APIView):
    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data

            payload = {
                'id': user.get('user').id,
                'username': user.get('username'),
                'staff': user.get('user').is_staff,
                'exp': datetime.utcnow() + settings.settings.JWT_AUTH['JWT_EXPIRATION_DELTA']
            }

            token = {'token': jwt.encode(payload, settings.settings.SECRET_KEY)}
            return Response(token)
        else:
            return Response(serializer.errors)


class ChangePasswordView(views.APIView):

    def get_object(self):
        user = self.request.user
        return user

    def put(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = ChangePasswordSerializer(data=request.data, context={'user': self.request.user})

        if serializer.is_valid():
            old_password = serializer.data.get('old_password')
            if not user.check_password(old_password):
                return Response({'old_password': 'Wrong password.'}, status=status.HTTP_400_BAD_REQUEST)

            new_password = serializer.data.get('new_password')
            user.set_password(new_password)
            user.save()
            return Response(status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CheckUsernameView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, req, *args, **kwargs):
        print(req.data)
        serializer = CheckUsernameSerializer(data=req.data)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CheckEmailView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, req, *args, **kwargs):
        print(req.data)
        serializer = CheckEmailSerializer(data=req.data)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

