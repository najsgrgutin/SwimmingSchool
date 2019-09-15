from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import permissions
from users.models import CustomUser
from users.serializers import UserSerializer, UserRegistrationSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
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

